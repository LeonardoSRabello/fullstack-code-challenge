import { getApiClient } from "src/modules/axios";

import {
  IAnswersForUserResponse,
  IAnswersForQuestionResponse,
  IAnswerActionResponse
} from "src/interfaces/answers";

export const getAnswersForUser = (userId: string, page: number) => {
  return getApiClient().get<IAnswersForUserResponse>(
    `/answers/user/${userId}`,
    {
      params: { page }
    }
  );
};

export const getAnswersForQuestion = (questionId: string, page: number) => {
  return getApiClient().get<IAnswersForQuestionResponse>(
    `/answers/question/${questionId}`,
    { params: { page } }
  );
};

export const createAnswer = (
  questionId: string,
  content: string,
  userId: string
) => {
  return getApiClient().post<IAnswerActionResponse>(`/answers/${questionId}`, {
    userId,
    content
  });
};

export const updateAnswer = (id: string, content: string) => {
  return getApiClient().put<IAnswerActionResponse>(`/answers/${id}`, {
    content
  });
};

export const deleteAnswer = (id: string) => {
  return getApiClient().delete<IAnswerActionResponse>(`/answers/${id}`);
};
