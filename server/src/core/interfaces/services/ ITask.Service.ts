import { CreateTaskDTO, UpdateTaskDTO } from "../../../dtos/tasks/Task.dto";
import { ITaskDto,  } from "../../../dtos/tasks/TaskResponseDto";


export interface ITaskService {
  getAllTasks(userId: string): Promise<ITaskDto[]>;
  createTask(userId: string, data: CreateTaskDTO, filePath?: string): Promise<ITaskDto>;
  updateTask(id: string, userId: string, data: UpdateTaskDTO, filePath?: string): Promise<ITaskDto|null>;
  deleteTask(id: string, userId: string): Promise<boolean>;
}
