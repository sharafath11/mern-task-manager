import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { TYPES } from "../core/types";
import { validateBodyFields } from "../utils/validateRequest";
import {
  sendResponse,
  handleControllerError,
  throwError,
} from "../utils/response";
import { StatusCode } from "../enums/statusCode";
import { MESSAGES } from "../const/messages";
import { decodeToken } from "../utils/jwtToken";
import { ITaskController } from "../core/interfaces/controllers/ ITask.Controller";
import { ITaskService } from "../core/interfaces/services/ ITask.Service";

@injectable()
export class TaskController implements ITaskController {
  constructor(
    @inject(TYPES.ITaskService)
    private readonly taskService: ITaskService
  ) {}

  private getUserId(req: Request): string {
    const token = req.cookies.token;
    if (!token) throwError(MESSAGES.AUTH.AUTH_REQUIRED, StatusCode.UNAUTHORIZED);

    const decoded = decodeToken(token);
    if (!decoded?.id)
      throwError(MESSAGES.AUTH.AUTH_REQUIRED, StatusCode.UNAUTHORIZED);

    return decoded.id;
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const userId = this.getUserId(req);

      const tasks = await this.taskService.getAllTasks(userId);

      sendResponse(res, StatusCode.OK, MESSAGES.COMMON.SUCCESS, true, tasks);
    } catch (error) {
      handleControllerError(res, error);
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = this.getUserId(req);

      validateBodyFields(req, ["title", "dueDate"]);

      const filePath = req.file ? `/uploads/${req.file.filename}` : undefined;

      const newTask = await this.taskService.createTask(
        userId,
        req.body,
        filePath
      );

      sendResponse(res, StatusCode.CREATED, MESSAGES.TASK.CREATED, true, newTask);
    } catch (error) {
      handleControllerError(res, error);
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = this.getUserId(req);

      if (!req.params.id)
        throwError(MESSAGES.TASK.INVALID_ID, StatusCode.BAD_REQUEST);

      const filePath = req.file ? `/uploads/${req.file.filename}` : undefined;

      const updatedTask = await this.taskService.updateTask(
        req.params.id,
        userId,
        req.body,
        filePath
      );

      sendResponse(res, StatusCode.OK, MESSAGES.TASK.UPDATED, true, updatedTask);
    } catch (error) {
      handleControllerError(res, error);
    }
  }
  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const userId = this.getUserId(req);

      if (!req.params.id)
        throwError(MESSAGES.TASK.INVALID_ID, StatusCode.BAD_REQUEST);

      await this.taskService.deleteTask(req.params.id, userId);

      sendResponse(res, StatusCode.OK, MESSAGES.TASK.DELETED, true);
    } catch (error) {
      handleControllerError(res, error);
    }
  }
}
