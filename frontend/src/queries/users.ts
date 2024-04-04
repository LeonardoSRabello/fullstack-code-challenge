import { getApiClient } from "src/modules/axios";
import {
  IUsersResponse,
  IUserResponse,
  IAllUsersResponse
} from "src/interfaces/users";

export const getUsers = (page: number) => {
  return getApiClient().get<IUsersResponse>("/users", { params: { page } });
};

export const getUser = (id: string) => {
  return getApiClient().get<IUserResponse>(`/users/${id}`);
};

export const getAllUsers = () => {
  return getApiClient().get<IAllUsersResponse>("/users/all");
};
