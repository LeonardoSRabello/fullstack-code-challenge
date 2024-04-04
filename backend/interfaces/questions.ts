import { Request } from "express";

export interface ICreateQuestionRequest extends Request {
  body: {
    title: string;
    content: string;
  };
}

export interface IGetQuestionsRequest extends Request {
  query: {
    page?: string;
    count?: string;
  };
}

export interface IUpdateQuestionRequest extends ICreateQuestionRequest {
  params: {
    id: string;
  };
}

export interface IDeleteQuestionRequest extends Request {
  params: {
    id: string;
  };
}
