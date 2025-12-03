import { inject, injectable } from "tsyringe";
import { TYPES } from "../core/types";
import { Types } from "mongoose";

import { ITaskRepository } from "../core/interfaces/repository/ITaskRepository";
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos/tasks/Task.dto";
import { ITaskDto } from "../dtos/tasks/TaskResponseDto";
import { TaskResponseMapper } from "../dtos/tasks/TaskResponseMapper";
import { ITaskService } from "../core/interfaces/services/ ITask.Service";
import { ITaskQueryParams } from "../types/task.types";
import { throwError } from "../utils/response";
import { MESSAGES } from "../const/messages";
import { escapeRegex } from "../utils/regExp";


@injectable()
export class TaskService implements ITaskService {
  
  constructor(
    @inject(TYPES.ITaskRepository)
    private _taskRepository: ITaskRepository
  ) {}
 async getAllTasks(userId: string, query: ITaskQueryParams) {
  const {
    search = "",
    status = "all",
    sort = "date_desc",
    page = 1,
    limit = 5
  } = query;

  const filters: any = { user: userId };
  if (status !== "all") {
    filters.status = status;
  }
  if (search) {
    filters.title = { $regex: search, $options: "i" };
  }
  let sortQuery: any = {};
  switch (sort) {
    case "date_asc":
      sortQuery.dueDate = 1;
      break;
    case "date_desc":
      sortQuery.dueDate = -1;
      break;
    case "title_asc":
      sortQuery.title = 1;
      break;
    case "title_desc":
      sortQuery.title = -1;
      break;
    default:
      sortQuery.dueDate = -1;
  }

  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    this._taskRepository.findAllPaginated(filters, sortQuery, skip, limit),
    this._taskRepository.count(filters),
  ]);

  return {
    tasks: TaskResponseMapper.toTaskList(tasks),
    total,
    totalPages: Math.ceil(total / limit),
  };
}



  async createTask(
    userId: string,
    data: CreateTaskDTO,
    filePath?: string
  ): Promise<ITaskDto> {
  const escapedTitle = escapeRegex(data.title);

  const existingTask = await this._taskRepository.findOne({
    user: new Types.ObjectId(userId),
    title: { $regex: `^${escapedTitle}$`, $options: "i" } 
  });

if (existingTask) {
  throwError(MESSAGES.TASK.DUP);
}

    const newTask = {
      ...data,
      user: new Types.ObjectId(userId),
      attachment: filePath || undefined,
      status: data.status || "todo",
      dueDate: new Date(data.dueDate)
    };

    const createdTask = await this._taskRepository.create(newTask as any);

    return TaskResponseMapper.toTaskResponse(createdTask);
  }
   async updateTask(
  id: string,
  userId: string,
  data: UpdateTaskDTO,
  filePath?: string
): Promise<ITaskDto | null> {
  if (data.title) {
    const escapedTitle = escapeRegex(data.title);

    const duplicate = await this._taskRepository.findOne({
      _id: { $ne: new Types.ObjectId(id) },       
      user: new Types.ObjectId(userId),          
      title: { $regex: `^${escapedTitle}$`, $options: "i" } 
    });

    if (duplicate) {
      throwError(MESSAGES.TASK.DUP);
    }
  } 

  const payload: any = { ...data };

  if (filePath) {
    payload.attachment = filePath;
  }

  if (data.dueDate) {
    payload.dueDate = new Date(data.dueDate);
  }

  const updatedTask = await this._taskRepository.update(id, {
    ...payload,
    user: new Types.ObjectId(userId),
  });

  if (!updatedTask) return null;

  return TaskResponseMapper.toTaskResponse(updatedTask);
}

  async deleteTask(id: string, userId: string): Promise<boolean> {
    const task = await this._taskRepository.findById(id);

    if (!task) throw new Error("Task not found");
    if (task.user.toString() !== userId) throw new Error("Unauthorized");

    return this._taskRepository.delete(id);
  }
}
