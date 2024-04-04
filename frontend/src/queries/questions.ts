import { getApiClient } from "src/modules/axios";
import {
  IQuestionsResponse,
  IQuestionActionResponse,
  IQuestionResponse
} from "src/interfaces/questions";

export const getQuestions = (page: number) => {
  return getApiClient().get<IQuestionsResponse>("/questions", {
    params: { page }
  });
};

export const getQuestion = (id: string) => {
  return getApiClient().get<IQuestionResponse>(`/questions/${id}`);
};

export const createQuestion = (title: string, content: string) => {
  return getApiClient().post<IQuestionActionResponse>("/questions", {
    title,
    content
  });
};

export const updateQuestion = (id: string, title: string, content: string) => {
  return getApiClient().put<IQuestionActionResponse>(`/questions/${id}`, {
    title,
    content
  });
};

export const deleteQuestion = (id: string) => {
  return getApiClient().delete<IQuestionActionResponse>(`/questions/${id}`);
};
