import { Request } from "express";

export interface IGetUsersRequest extends Request {
  query: {
    page?: string;
    count?: string;
  };
}

export interface IGetUserRequest extends Request {
  params: {
    id: string;
  };
}
