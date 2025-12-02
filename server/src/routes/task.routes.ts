import express from "express";
import { container } from "tsyringe";
import { TYPES } from "../core/types";

import { authenticateToken } from "../middleware/authenticateToken";
import { upload } from "../middleware/upload";
import { ITaskController } from "../core/interfaces/controllers/ ITask.Controller";

const router = express.Router();

const taskController = container.resolve<ITaskController>(
  TYPES.ITaskController
);

router
  .route("/")
  .get(authenticateToken, taskController.getAllTasks.bind(taskController))
  .post(
    authenticateToken,
    upload.single("attachment"),
    taskController.createTask.bind(taskController)
  );

router
  .route("/:id")
  .put(
    authenticateToken,
    upload.single("attachment"),
    taskController.updateTask.bind(taskController)
  )
  .delete(authenticateToken, taskController.deleteTask.bind(taskController));

export default router;
