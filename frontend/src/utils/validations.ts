import * as Yup from "yup";

export const titleSchema = () => {
  return Yup.string()
    .max(100, "Max title length should be 100")
    .required("This field is required");
};

export const contentSchema = () => {
  return Yup.string().required("This field is required");
};

export const idSchema = () => {
  return Yup.string().required("This field is required");
};
