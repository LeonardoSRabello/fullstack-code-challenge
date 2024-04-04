import { Schema, model } from "mongoose";

import { IAnswerModel } from "../interfaces/models";

const answerSchema = new Schema<IAnswerModel>(
  {
    content: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    questionId: { type: Schema.Types.ObjectId, ref: "Question" },
    archived: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const user = model("Answer", answerSchema);

export default user;
