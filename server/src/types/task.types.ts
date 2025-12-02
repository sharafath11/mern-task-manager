import { Types } from "mongoose";
import { ITaskDto } from "../dtos/tasks/TaskResponseDto";

export type TaskStatus = "todo" | "in-progress" | "completed" | "overdue";

export interface ITask {
  user: Types.ObjectId;  
  title: string;
  status: TaskStatus;
  dueDate: Date;
  attachment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

