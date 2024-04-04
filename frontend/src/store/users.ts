import { makeAutoObservable, observable, action, computed } from "mobx";
import { AxiosError } from "axios";

import { getUsers } from "src/queries/users";
import { IUser } from "src/interfaces/users";

export class Users {
  totalCount: number = 0;
  users: IUser[] = [];
  page: number = 1;
  loading: boolean = false;
  error: string = "";

  get totalPageCount() {
    return Math.max(Math.ceil(this.totalCount / 10), 1);
  }

  constructor() {
    makeAutoObservable(this, {
      totalCount: observable,
      users: observable,
      page: observable,
      loading: observable,
      error: observable,
      totalPageCount: computed,
      getUsers: action,
      changePage: action
    });
  }

  async getUsers() {
    this.loading = true;
    try {
      const users = await getUsers(this.page);
      this.totalCount = users.data.totalCount;
      this.users = users.data.users;
      this.error = "";
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400) {
        this.error = "Page Number or Page Count is wrong";
      } else if (error.response?.status === 500) {
        this.error = "Internal Server Error";
      } else {
        this.error = "Unknown Error";
      }
    } finally {
      this.loading = false;
    }
  }

  async changePage(page: number) {
    this.page = page;
    await this.getUsers();
  }
}
