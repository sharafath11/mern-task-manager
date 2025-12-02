export type TaskStatus = "todo" | "in-progress" | "completed" | "overdue";

export interface ITask {
  taskId: string;
  title: string;
  dueDate: string;
  status: TaskStatus;
  attachment?: string | null;
}
