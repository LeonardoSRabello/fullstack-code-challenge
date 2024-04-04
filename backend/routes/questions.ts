import express from "express";

import {
  createQuestionController,
  getQuestionsController,
  updateQuestionController,
  deleteQuestionController,
  getQuestionController
} from "../controllers/questions";

const router = express.Router();

router.post("/", createQuestionController);
router.get("/:id", getQuestionController);
router.get("/", getQuestionsController);
router.put("/:id", updateQuestionController);
router.delete("/:id", deleteQuestionController);

export default router;
