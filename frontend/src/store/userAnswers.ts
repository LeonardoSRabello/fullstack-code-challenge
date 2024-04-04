import { makeAutoObservable, observable, action, computed } from "mobx";
import { AxiosError } from "axios";

import { getUser } from "src/queries/users";
import { getAnswersForUser } from "src/queries/answers";
import { IAnswerForUser } from "src/interfaces/answers";

import { RootStore } from "./index";

export class UserAnswers {
  rootStore: RootStore;
  id: string = "";
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  loading: boolean = false;
  totalCount: number = 0;
  answers: IAnswerForUser[] = [];
  page: number = 1;
  answerLoading: boolean = false;
  error: string = "";

  get totalPageCount() {
    return Math.max(Math.ceil(this.totalCount / 10), 1);
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      id: observable,
      first_name: observable,
      last_name: observable,
      email: observable,
      loading: observable,
      totalCount: observable,
      answers: observable,
      page: observable,
      answerLoading: observable,
      error: observable,
      totalPageCount: computed,
      getUser: action,
      getAnswersForUser: action
    });
  }

  async getUser(id: string) {
    this.id = id;
    this.loading = true;
    try {
      const user = await getUser(id);
      this.first_name = user.data.user.first_name;
      this.last_name = user.data.user.last_name;
      this.email = user.data.user.email;
      this.page = 1;
      this.answers = [];
      this.answerLoading = false;
      this.error = "";
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400 || error.response?.status === 404) {
        this.error = "Cannot find the user";
      } else if (error.response?.status === 500) {
        this.error = "Internal Server Error";
      } else {
        this.error = "Unknown Error";
      }
    } finally {
      this.loading = false;
    }
  }
  async getAnswersForUser() {
    if (!this.id || !!this.error || this.answerLoading || this.loading) {
      return;
    }
    this.answerLoading = true;
    try {
      const answers = await getAnswersForUser(this.id, this.page);
      this.totalCount = answers.data.totalCount;
      this.answers = [...this.answers, ...answers.data.answers];
      this.page = this.page + 1;
    } catch (err) {
      const error = err as AxiosError;
      let message;
      if (error.response?.status === 400) {
        message = "Page Number or Page Count is wrong";
      } else if (error.response?.status === 500) {
        message = "Internal Server Error";
      } else {
        message = "Unknown Error";
      }
      this.rootStore.alerts.alert("error", message);
    } finally {
      this.answerLoading = false;
    }
  }
}
