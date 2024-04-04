import { Request, Response } from "express";
import * as Yup from "yup";

import User from "../models/user";
import { IGetUsersRequest, IGetUserRequest } from "../interfaces/users";
import { pageSchema, countSchema, idSchema } from "../utils/validate";
import * as response from "../utils/responses";

const getUsersValidator = Yup.object({
  page: pageSchema(),
  count: countSchema()
});

export const getUsersController = async (
  req: IGetUsersRequest,
  res: Response
) => {
  const isValid = getUsersValidator.isValidSync({
    page: req.query.page,
    count: req.query.count
  });
  if (!isValid) {
    return res.status(400).json({ code: response.INVALID_INPUTS });
  }

  const page = parseInt(req.query.page || "1");
  const count = parseInt(req.query.count || "10");
  try {
    const totalCount = await User.countDocuments({});
    const users = await User.aggregate([
      {
        $lookup: {
          from: "answers",
          localField: "_id",
          foreignField: "userId",
          as: "answerDocs"
        }
      },
      {
        $unwind: { path: "$answerDocs", preserveNullAndEmptyArrays: true }
      },
      {
        $match: {
          $or: [
            { answerDocs: { $exists: false } },
            {
              "answerDocs.archived": false
            }
          ]
        }
      },
      {
        $group: {
          _id: "$_id",
          first_name: { $first: "$first_name" },
          last_name: { $first: "$last_name" },
          email: { $first: "$email" },
          answer_count: {
            $sum: {
              $cond: [{ $ifNull: ["$answerDocs", false] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: {
          first_name: 1,
          last_name: 1
        }
      },
      {
        $skip: (page - 1) * count
      },
      { $limit: count }
    ]).exec();
    res.status(200).json({ totalCount, users, page });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: response.INTERNAL_SERVER_ERROR });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: response.INTERNAL_SERVER_ERROR });
  }
};

export const getUserController = async (
  req: IGetUserRequest,
  res: Response
) => {
  const { id } = req.params;
  const isValid = idSchema().isValidSync(id);
  if (!isValid) {
    return res.status(400).json({ code: response.INVALID_INPUTS });
  }
  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ code: response.NOT_FOUND });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: response.INTERNAL_SERVER_ERROR });
  }
};
