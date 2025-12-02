import { TaskStatus } from "../../types/task.types";

export interface CreateTaskDTO {
  title: string;
  dueDate: string;                
  status?: TaskStatus;          
  attachment?: string;
}

export interface UpdateTaskDTO {
  title?: string;
  dueDate?: string;
  status?: TaskStatus;
  attachment?: string | null;    
}
