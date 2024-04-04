import { Response } from "express";
import * as Yup from "yup";

import Answer from "../models/answers";
import {
  ICreateAnswerRequest,
  IGetAnswersForQuestionRequest,
  IGetAnswersForUserRequest,
  IUpdateAnswerRequest,
  IDeleteAnswerRequest
} from "../interfaces/answers";
import {
  contentSchema,
  idSchema,
  pageSchema,
  countSchema
} from "../utils/validate";
import * as response from "../utils/responses";

const createAnswerValidator = Yup.object({
  questionId: idSchema(),
  userId: idSchema(),
  content: contentSchema()
});

export const createAnswerController = async (
  req: ICreateAnswerRequest,
  res: Response
) => {
  const { questionId } = req.params;
  const { userId, content } = req.body;
  const isValid = createAnswerValidator.isValidSync({
    questionId,
    userId,
    content
  });
  if (!isValid) {
    return res.status(400).json({ code: response.INVALID_INPUTS });
  }
  try {
    const question = new Answer({ questionId, userId, content });
    await question.save();
    res.status(200).json({ code: response.SUCCESSFULLY_CREATED });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: response.INTERNAL_SERVER_ERROR });
  }
};

const getAnswersForUserValidator = Yup.object({
  userId: idSchema(),
  page: pageSchema(),
  count: countSchema()
});

export const getAnswersForUserController = async (
  req: IGetAnswersForUserRequest,
  res: Response
) => {
  const { userId } = req.params;
  const isValid = getAnswersForUserValidator.isValidSync({
    userId,
    page: req.query.page,
    count: req.query.count
  });
  if (!isValid) {
    return res.status(400).json({ code: response.INVALID_INPUTS });
  }

  const page = parseInt(req.query.page || "1");
  const count = parseInt(req.query.count || "10");
  try {
    const totalCount = await Answer.countDocuments({
      archived: false,
      userId
    });
    const answers = await Answer.find({ userId, archived: false })
      .sort({
        createdAt: -1
      })
      .skip((page - 1) * count)
      .limit(count)
      .populate("questionId", "title content");
    res.status(200).json({ totalCount, answers, page });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: response.INTERNAL_SERVER_ERROR });
  }
};

const getAnswersForQuestionValidator = Yup.object({
  questionId: idSchema(),
  page: pageSchema(),
  count: countSchema()
});

export const getAnswersForQuestionController = async (
  req: IGetAnswersForQuestionRequest,
  res: Response
) => {
  const { questionId } = req.params;
  const isValid = getAnswersForQuestionValidator.isValidSync({
    questionId,
    page: req.query.page,
    count: req.query.count
  });
  if (!isValid) {
    return res.status(400).json({ code: response.INVALID_INPUTS });
  }

  const page = parseInt(req.query.page || "1");
  const count = parseInt(req.query.count || "10");
  try {
    const totalCount = await Answer.countDocuments({
      archived: false,
      questionId
    });
    const answers = await Answer.find({ questionId, archived: false })
      .sort({
        createdAt: -1
      })
      .skip((page - 1) * count)
      .limit(count)
      .populate("userId", "first_name last_name");
    res.status(200).json({ totalCount, answers, page });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: response.INTERNAL_SERVER_ERROR });
  }
};

const updateAnswerValidator = Yup.object({
  id: idSchema(),
  content: contentSchema()
});

export const updateAnswerController = async (
  req: IUpdateAnswerRequest,
  res: Response
) => {
  const { id } = req.params;
  const { content } = req.body;
  const isValid = updateAnswerValidator.isValidSync({ id, content });
  if (!isValid) {
    return res.status(400).json({ code: response.INVALID_INPUTS });
  }
  try {
    await Answer.findByIdAndUpdate(id, { content });
    res.status(200).json({ code: response.SUCCESSFULLY_UPDATED });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: response.INTERNAL_SERVER_ERROR });
  }
};

export const deleteAnswerController = async (
  req: IDeleteAnswerRequest,
  res: Response
) => {
  const { id } = req.params;
  const isValid = idSchema().isValidSync(id);
  if (!isValid) {
    return res.status(400).json({ code: response.INVALID_INPUTS });
  }
  try {
    await Answer.findByIdAndUpdate(id, { archived: true });
    res.status(200).json({ code: response.SUCCESSFULLY_DELETED });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: response.INTERNAL_SERVER_ERROR });
  }
};
