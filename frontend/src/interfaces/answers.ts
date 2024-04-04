import { IUser } from "./users";

export interface IAnswerForUser {
  _id: string;
  content: string;
  createdAt: Date;
  questionId: {
    _id: string;
    title: string;
    content: string;
  };
  userId: string;
}

export interface IAnswersForUserResponse {
  totalCount: number;
  answers: IAnswerForUser[];
  page: number;
}

export interface IAnswerForQuestion {
  _id: string;
  content: string;
  createdAt: Date;
  questionId: string;
  userId: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface IAnswersForQuestionResponse {
  totalCount: number;
  answers: IAnswerForQuestion[];
  page: number;
}

export interface IAnswerActionResponse {
  code: string;
}

export interface IAnswerFormInput {
  content: string;
  userId: string;
}
