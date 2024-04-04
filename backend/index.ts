import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import apiRouter from "./routes";
import { checkDB } from "./utils/seed";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

console.log("DB connecting...");
mongoose
  .connect(process.env.MONGO_URL || "")
  .then(async () => {
    console.log("DB connected");

    await checkDB();

    app.listen(port, () => {
      console.log(`App started at ${port}`);
    });
  })
  .catch(err => {
    console.log("DB connection failed", err);
  });
