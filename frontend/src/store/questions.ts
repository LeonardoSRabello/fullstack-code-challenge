import { makeAutoObservable, observable, action, computed } from "mobx";
import { AxiosError } from "axios";

import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion
} from "src/queries/questions";
import { IQuestion, IQuestionFormInput } from "src/interfaces/questions";

import { RootStore } from "./index";

export class Questions {
  rootStore: RootStore;
  totalCount: number = 0;
  questions: IQuestion[] = [];
  page: number = 1;
  loading: boolean = false;
  error: string = "";
  actionLoading: boolean = false;
  createOpen: boolean = false;
  deleteOpen: boolean = false;
  selectedQuestion: IQuestion | null = null;

  get totalPageCount() {
    return Math.max(Math.ceil(this.totalCount / 10), 1);
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      totalCount: observable,
      questions: observable,
      page: observable,
      loading: observable,
      error: observable,
      actionLoading: observable,
      createOpen: observable,
      deleteOpen: observable,
      selectedQuestion: observable,
      totalPageCount: computed,
      getQuestions: action,
      changePage: action,
      createQuestion: action,
      updateQuestion: action,
      deleteQuestion: action,
      openCreateModal: action,
      openUpdateModal: action,
      openDeleteModal: action,
      dismissModal: action
    });
  }

  async getQuestions() {
    this.loading = true;
    try {
      const questions = await getQuestions(this.page);
      this.totalCount = questions.data.totalCount;
      this.questions = questions.data.questions;
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
    await this.getQuestions();
  }

  openCreateModal() {
    this.selectedQuestion = null;
    this.createOpen = true;
  }

  openUpdateModal(id: string) {
    const question = this.questions.find(q => q._id === id);
    if (question) {
      this.selectedQuestion = question;
      this.createOpen = true;
    }
  }

  openDeleteModal(id: string) {
    const question = this.questions.find(q => q._id === id);
    if (question) {
      this.selectedQuestion = question;
      this.deleteOpen = true;
    }
  }

  dismissModal() {
    this.selectedQuestion = null;
    this.createOpen = false;
    this.deleteOpen = false;
  }

  async createQuestion(data: IQuestionFormInput) {
    this.actionLoading = true;
    try {
      await createQuestion(data.title, data.content);
      this.page = 1;
      this.rootStore.alerts.alert(
        "success",
        "New question is successfully created"
      );
      this.dismissModal();
      await this.getQuestions();
    } catch (err) {
      const error = err as AxiosError;
      let message;
      if (error.response?.status === 400) {
        message = "Title or Content is wrong";
      } else if (error.response?.status === 500) {
        message = "Internal Server Error";
      } else {
        message = "Unknown Error";
      }
      this.rootStore.alerts.alert("error", message);
    } finally {
      this.actionLoading = false;
    }
  }

  async updateQuestion(data: IQuestionFormInput) {
    if (!this.selectedQuestion) {
      return;
    }
    this.actionLoading = true;
    try {
      await updateQuestion(this.selectedQuestion._id, data.title, data.content);
      this.rootStore.alerts.alert(
        "success",
        "Question is successfully updated"
      );
      this.dismissModal();
      await this.getQuestions();
    } catch (err) {
      const error = err as AxiosError;
      let message;
      if (error.response?.status === 400) {
        message = "Title or Content is wrong";
      } else if (error.response?.status === 500) {
        message = "Internal Server Error";
      } else {
        message = "Unknown Error";
      }
      this.rootStore.alerts.alert("error", message);
    } finally {
      this.actionLoading = false;
    }
  }

  async deleteQuestion() {
    if (!this.selectedQuestion) {
      return;
    }
    this.actionLoading = true;
    try {
      await deleteQuestion(this.selectedQuestion._id);
      this.rootStore.alerts.alert(
        "success",
        "Question is successfully deleted"
      );
      this.dismissModal();
      await this.getQuestions();
    } catch (err) {
      const error = err as AxiosError;
      let message;
      if (error.response?.status === 500) {
        message = "Internal Server Error";
      } else {
        message = "Unknown Error";
      }
      this.rootStore.alerts.alert("error", message);
    } finally {
      this.actionLoading = false;
    }
  }
}
