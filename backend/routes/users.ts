import express from "express";

import {
  getUsersController,
  getAllUsersController,
  getUserController
} from "../controllers/users";

const router = express.Router();

router.get("/", getUsersController);
router.get("/all", getAllUsersController);
router.get("/:id", getUserController);

export default router;
