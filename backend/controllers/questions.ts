import { Response } from "express";
import * as Yup from "yup";

import Question from "../models/question";
import {
  ICreateQuestionRequest,
  IGetQuestionsRequest,
  IUpdateQuestionRequest,
  IDeleteQuestionRequest
} from "../interfaces/questions";
import {
  titleSchema,
  contentSchema,
  idSchema,
  pageSchema,
  countSchema
} from "../utils/validate";
import * as response from "../utils/responses";

const createQuestionValidator = Yup.object({
  title: titleSchema(),
  content: contentSchema()
});

export const createQuestionController = async (
  req: ICreateQuestionRequest,
  res: Response
) => {
  const { title, content } = req.body;
  const isValid = createQuestionValidator.isValidSync({ title, content });
  if (!isValid) {
    return res.status(400).json({ code: response.INVALID_INPUTS });
  }
  try {
    const question = new Question({ title, content });
    await question.save();
    res.status(200).json({ code: response.SUCCESSFULLY_CREATED });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: response.INTERNAL_SERVER_ERROR });
  }
};

const getQuestionsValidator = Yup.object({
  page: pageSchema(),
  count: countSchema()
});

export const getQuestionsController = async (
  req: IGetQuestionsRequest,
  res: Response
) => {
  const isValid = getQuestionsValidator.isValidSync({
    page: req.query.page,
    count: req.query.count
  });
  if (!isValid) {
    return res.status(400).json({ code: response.INVALID_INPUTS });
  }

  const page = parseInt(req.query.page || "1");
  const count = parseInt(req.query.count || "10");
  try {
    const totalCount = await Question.countDocuments({ archived: false });
    const questions = await Question.aggregate([
      { $match: { archived: false } },
      {
        $lookup: {
          from: "answers",
          localField: "_id",
          foreignField: "questionId",
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
          title: { $first: "$title" },
          content: { $first: "$content" },
          createdAt: { $first: "$createdAt" },
          answer_count: {
            $sum: {
              $cond: [{ $ifNull: ["$answerDocs", false] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $skip: (page - 1) * count
      },
      { $limit: count }
    ]).exec();
    res.status(200).json({ totalCount, questions, page });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: response.INTERNAL_SERVER_ERROR });
  }
};

const updateQuestionValidator = Yup.object({
  id: idSchema(),
  title: titleSchema(),
  content: contentSchema()
});

export const updateQuestionController = async (
  req: IUpdateQuestionRequest,
  res: Response
) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const isValid = updateQuestionValidator.isValidSync({ id, title, content });
  if (!isValid) {
    return res.status(400).json({ code: response.INVALID_INPUTS });
  }
  try {
    await Question.findByIdAndUpdate(id, { title, content });
    res.status(200).json({ code: response.SUCCESSFULLY_UPDATED });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: response.INTERNAL_SERVER_ERROR });
  }
};

export const deleteQuestionController = async (
  req: IDeleteQuestionRequest,
  res: Response
) => {
  const { id } = req.params;
  const isValid = idSchema().isValidSync(id);
  if (!isValid) {
    return res.status(400).json({ code: response.INVALID_INPUTS });
  }
  try {
    await Question.findByIdAndUpdate(id, { archived: true });
    res.status(200).json({ code: response.SUCCESSFULLY_DELETED });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: response.INTERNAL_SERVER_ERROR });
  }
};

export const getQuestionController = async (
  req: IDeleteQuestionRequest,
  res: Response
) => {
  const { id } = req.params;
  const isValid = idSchema().isValidSync(id);
  if (!isValid) {
    return res.status(400).json({ code: response.INVALID_INPUTS });
  }
  try {
    const question = await Question.findById(id, { archived: false });
    if (question) {
      res.status(200).json({ question });
    } else {
      res.status(404).json({ code: response.NOT_FOUND });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: response.INTERNAL_SERVER_ERROR });
  }
};
