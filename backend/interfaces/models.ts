import { Types } from "mongoose";

export interface IUserModel {
  first_name: string;
  last_name: string;
  email: string;
}

export interface IQuestionModel {
  title: string;
  content: string;
  archived: boolean;
}

export interface IAnswerModel {
  content: string;
  userId: Types.ObjectId;
  questionId: Types.ObjectId;
  archived: boolean;
}
