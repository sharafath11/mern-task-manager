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

 export interface ITaskQueryParams {
  search?: string;
  status?: "all" | "todo" | "in-progress" | "completed" | "overdue";
  sort?: "date_desc" | "date_asc" | "title_asc" | "title_desc";
  page?: number;
  limit?: number;
}
