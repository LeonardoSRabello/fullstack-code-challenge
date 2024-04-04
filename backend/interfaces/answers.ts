import { Request } from "express";

export interface ICreateAnswerRequest extends Request {
  params: {
    questionId: string;
  };
  body: {
    content: string;
    userId: string;
  };
}

export interface IGetAnswersForQuestionRequest extends Request {
  params: {
    questionId: string;
  };
  query: {
    page?: string;
    count?: string;
  };
}

export interface IGetAnswersForUserRequest extends Request {
  params: {
    userId: string;
  };
  query: {
    page?: string;
    count?: string;
  };
}

export interface IUpdateAnswerRequest extends Request {
  params: {
    id: string;
  };
  body: {
    content: string;
  };
}

export interface IDeleteAnswerRequest extends Request {
  params: {
    id: string;
  };
}
