import { Schema, model } from "mongoose";

import { IQuestionModel } from "../interfaces/models";

const questionSchema = new Schema<IQuestionModel>(
  {
    title: String,
    content: String,
    archived: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const user = model("Question", questionSchema);

export default user;
