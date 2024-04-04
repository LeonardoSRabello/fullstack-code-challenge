import { makeAutoObservable, observable, action, computed } from "mobx";
import { AxiosError } from "axios";

import { getQuestion } from "src/queries/questions";
import { getAllUsers } from "src/queries/users";
import {
  getAnswersForQuestion,
  createAnswer,
  updateAnswer,
  deleteAnswer
} from "src/queries/answers";
import { IAnswerForQuestion, IAnswerFormInput } from "src/interfaces/answers";
import { IUser } from "src/interfaces/users";

import { RootStore } from "./index";

export class QuestionAnswers {
  rootStore: RootStore;
  id: string = "";
  title: string = "";
  content: string = "";
  users: IUser[] = [];
  createdAt: Date = new Date();
  loading: boolean = false;
  totalCount: number = 0;
  answers: IAnswerForQuestion[] = [];
  page: number = 1;
  answerLoading: boolean = false;
  error: string = "";
  actionLoading: boolean = false;
  createOpen: boolean = false;
  deleteOpen: boolean = false;
  selectedAnswer: IAnswerForQuestion | null = null;

  get totalPageCount() {
    return Math.max(Math.ceil(this.totalCount / 10), 1);
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {
      id: observable,
      title: observable,
      content: observable,
      users: observable,
      createdAt: observable,
      loading: observable,
      totalCount: observable,
      answers: observable,
      page: observable,
      answerLoading: observable,
      error: observable,
      actionLoading: observable,
      createOpen: observable,
      deleteOpen: observable,
      selectedAnswer: observable,
      totalPageCount: computed,
      getQuestion: action,
      getAnswersForQuestion: action,
      openCreateModal: action,
      openUpdateModal: action,
      openDeleteModal: action,
      dismissModal: action,
      createAnswer: action,
      updateAnswer: action,
      deleteAnswer: action
    });
  }

  async getQuestion(id: string) {
    this.id = id;
    this.loading = true;
    try {
      const question = await getQuestion(id);
      this.title = question.data.question.title;
      this.content = question.data.question.content;
      this.createdAt = question.data.question.createdAt;
      const users = await getAllUsers();
      this.users = users.data.users;
      this.page = 1;
      this.answers = [];
      this.answerLoading = false;
      this.error = "";
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400 || error.response?.status === 404) {
        this.error = "Cannot find the question";
      } else if (error.response?.status === 500) {
        this.error = "Internal Server Error";
      } else {
        this.error = "Unknown Error";
      }
    } finally {
      this.loading = false;
    }
  }

  async getAnswersForQuestion() {
    if (!this.id || !!this.error || this.answerLoading || this.loading) {
      return;
    }
    this.answerLoading = true;
    try {
      const answers = await getAnswersForQuestion(this.id, this.page);
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

  openCreateModal() {
    this.selectedAnswer = null;
    this.createOpen = true;
  }

  openUpdateModal(id: string) {
    const answer = this.answers.find(a => a._id === id);
    if (answer) {
      this.selectedAnswer = answer;
      this.createOpen = true;
    }
  }

  openDeleteModal(id: string) {
    const answer = this.answers.find(a => a._id === id);
    if (answer) {
      this.selectedAnswer = answer;
      this.deleteOpen = true;
    }
  }

  dismissModal() {
    this.selectedAnswer = null;
    this.createOpen = false;
    this.deleteOpen = false;
  }

  async createAnswer(data: IAnswerFormInput) {
    if (!this.id) {
      return;
    }
    this.actionLoading = true;
    try {
      await createAnswer(this.id, data.content, data.userId);
      this.page = 1;
      this.rootStore.alerts.alert(
        "success",
        "New answer is successfully posted"
      );
      this.dismissModal();
      this.answers = [];
      this.page = 1;
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

  async updateAnswer(data: IAnswerFormInput) {
    if (!this.selectedAnswer) {
      return;
    }
    this.actionLoading = true;
    try {
      const selectedId = this.selectedAnswer._id;
      await updateAnswer(selectedId, data.content);
      this.rootStore.alerts.alert("success", "Answer is successfully updated");
      this.answers = this.answers.map(answer =>
        answer._id === selectedId
          ? { ...answer, content: data.content }
          : { ...answer }
      );
      this.dismissModal();
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

  async deleteAnswer() {
    if (!this.selectedAnswer) {
      return;
    }
    this.actionLoading = true;
    try {
      const selectedId = this.selectedAnswer._id;
      await deleteAnswer(selectedId);
      this.rootStore.alerts.alert("success", "Answer is successfully deleted");
      this.answers = this.answers.filter(answer => answer._id !== selectedId);
      this.dismissModal();
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
