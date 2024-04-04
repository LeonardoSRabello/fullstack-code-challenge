import { IUserHeader } from "src/interfaces/users";
import { IQuestionHeader } from "src/interfaces/questions";

export const USERS_HEADERS: IUserHeader[] = [
  { key: "first_name", label: "First Name", align: "left" },
  { key: "last_name", label: "Last Name", align: "left" },
  { key: "email", label: "Email", align: "left" },
  { key: "answer_count", label: "Answer Count", align: "right" }
];

export const QUESTIONS_HEADERS: IQuestionHeader[] = [
  { key: "title", label: "Title", align: "left" },
  { key: "content", label: "Content", align: "left", type: "content" },
  {
    key: "answer_count",
    label: "Answer Count",
    align: "right",
    width: "150px"
  },
  {
    key: "createdAt",
    label: "Created At",
    align: "right",
    width: "200px",
    type: "date"
  },
  { key: "action", label: "", align: "left", width: "100px" }
];
