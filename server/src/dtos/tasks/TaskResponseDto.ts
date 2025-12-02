export interface ITaskDto {
  taskId: string;
  title: string;
  status: string;
  dueDate: string;
  attachment?: string | null;
}
export interface ITaskDetailDto extends ITaskDto {
  createdAt: string;
  updatedAt: string;
}