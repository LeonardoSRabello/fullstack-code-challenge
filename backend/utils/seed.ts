import { IUserModel } from "../interfaces/models";
import User from "../models/user";
import { INITIAL_USERS } from "../utils/data";

export const seed = async (data: IUserModel) => {
  const user = new User({ ...data });
  await user.save();
};

export const checkDB = async () => {
  console.log("Checking DB initialization...");
  const users = await User.find({});
  if (!users.length) {
    console.log("Seeding initial user data...");
    await Promise.all(INITIAL_USERS.map(user => seed(user)));
    console.log("Seed completed");
  }
  console.log("DB initialization check finished");
};
