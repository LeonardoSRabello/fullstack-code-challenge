import { Schema, model } from "mongoose";

import { IUserModel } from "../interfaces/models";

const userSchema = new Schema<IUserModel>(
  {
    first_name: String,
    last_name: String,
    email: String
  },
  { timestamps: true }
);

const user = model("User", userSchema);

export default user;
