import { CreateTaskDTO, UpdateTaskDTO } from "../../../dtos/tasks/Task.dto";
import { ITaskDto,  } from "../../../dtos/tasks/TaskResponseDto";
import { ITaskQueryParams } from "../../../types/task.types";


export interface ITaskService {
  getAllTasks(
    userId: string,
    query: ITaskQueryParams
  ): Promise<{
    tasks: ITaskDto[];
    total: number;
    totalPages: number;
  }>;  createTask(userId: string, data: CreateTaskDTO, filePath?: string): Promise<ITaskDto>;
  updateTask(id: string, userId: string, data: UpdateTaskDTO, filePath?: string): Promise<ITaskDto|null>;
  deleteTask(id: string, userId: string): Promise<boolean>;
}
