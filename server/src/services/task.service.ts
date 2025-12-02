import { inject, injectable } from "tsyringe";
import { TYPES } from "../core/types";
import { Types } from "mongoose";

import { ITaskRepository } from "../core/interfaces/repository/ITaskRepository";
import { CreateTaskDTO, UpdateTaskDTO } from "../dtos/tasks/Task.dto";
import { ITaskDto } from "../dtos/tasks/TaskResponseDto";
import { TaskResponseMapper } from "../dtos/tasks/TaskResponseMapper";
import { ITaskService } from "../core/interfaces/services/ ITask.Service";


@injectable()
export class TaskService implements ITaskService {
  
  constructor(
    @inject(TYPES.ITaskRepository)
    private taskRepository: ITaskRepository
  ) {}
  async getAllTasks(userId: string): Promise<ITaskDto[]> {
    const tasks = await this.taskRepository.findAll({ user: userId });
    return TaskResponseMapper.toTaskList(tasks);
  }

  async createTask(
    userId: string,
    data: CreateTaskDTO,
    filePath?: string
  ): Promise<ITaskDto> {

    const newTask = {
      ...data,
      user: new Types.ObjectId(userId),
      attachment: filePath || undefined,
      status: data.status || "todo",
      dueDate: new Date(data.dueDate)
    };

    const createdTask = await this.taskRepository.create(newTask as any);

    return TaskResponseMapper.toTaskResponse(createdTask);
  }

  async updateTask(
    id: string,
    userId: string,
    data: UpdateTaskDTO,
    filePath?: string
  ): Promise<ITaskDto | null> {

    const payload: any = { ...data };

    if (filePath) payload.attachment = filePath;
    if (data.dueDate) payload.dueDate = new Date(data.dueDate);

    const updatedTask = await this.taskRepository.update(id, {
      ...payload,
      user: new Types.ObjectId(userId),
    });

    if (!updatedTask) return null;

    return TaskResponseMapper.toTaskResponse(updatedTask);
  }
  async deleteTask(id: string, userId: string): Promise<boolean> {
    const task = await this.taskRepository.findById(id);

    if (!task) throw new Error("Task not found");
    if (task.user.toString() !== userId) throw new Error("Unauthorized");

    return this.taskRepository.delete(id);
  }
}
