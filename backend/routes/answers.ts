import express from "express";

import {
  createAnswerController,
  getAnswersForQuestionController,
  getAnswersForUserController,
  updateAnswerController,
  deleteAnswerController
} from "../controllers/answers";

const router = express.Router();

router.post("/:questionId", createAnswerController);
router.get("/question/:questionId", getAnswersForQuestionController);
router.get("/user/:userId", getAnswersForUserController);
router.put("/:id", updateAnswerController);
router.delete("/:id", deleteAnswerController);

export default router;
