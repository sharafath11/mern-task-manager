import { ITask } from "./taskType";
import { IUser } from "./userTypes";

export interface IHeaderProps {
  isAuthenticated: boolean;
  userName?: string;
  onLogout?: () => void;
}
export interface ITaskCardProps {
  title: string;
  dueDate: string;
  status: "todo" | "in-progress" | "completed" | "overdue";
  attachment?: string;
  onEdit: () => void;
  onDelete: () => void;
}
export interface IAddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: FormData) => void;
}
export interface IEditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: FormData) => void;
  task: ITask;
}
export interface IHeaderProps {
  isAuthenticated: boolean;
  userName?: string;
  onLogout?: () => void;
}
export interface IUserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}
