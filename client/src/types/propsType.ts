import { ITask } from "./taskType";

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
