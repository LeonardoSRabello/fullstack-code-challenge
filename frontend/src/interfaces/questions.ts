export interface IQuestion {
  _id: string;
  title: string;
  content: string;
  createdAt: Date;
  answer_count: number;
}

export interface IQuestionHeader {
  key: keyof IQuestion | "action";
  label: string;
  align: "left" | "right";
  width?: string;
  type?: string;
}

export interface IQuestionsResponse {
  totalCount: number;
  questions: IQuestion[];
  page: number;
}

export interface IQuestionActionResponse {
  code: string;
}

export interface IQuestionFormInput {
  title: string;
  content: string;
}

export interface IQuestionResponse {
  question: {
    _id: string;
    title: string;
    content: string;
    createdAt: Date;
  };
}
