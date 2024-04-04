export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  answer_count: number;
}

export interface IUserHeader {
  key: keyof IUser;
  label: string;
  align: "left" | "right";
}

export interface IUsersResponse {
  totalCount: number;
  users: IUser[];
  page: number;
}

export interface IUserResponse {
  user: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface IAllUsersResponse {
  users: IUser[];
}
