import * as Yup from "yup";
import { Types } from "mongoose";

export const pageSchema = () => {
  return Yup.number().min(1);
};

export const countSchema = () => {
  return Yup.number().min(1);
};

export const titleSchema = () => {
  return Yup.string()
    .max(100)
    .required();
};

export const contentSchema = () => {
  return Yup.string().required();
};

export const idSchema = () => {
  return Yup.string().test("objectid", "Invalid ObjectID", value =>
    Types.ObjectId.isValid(value || "")
  );
};
