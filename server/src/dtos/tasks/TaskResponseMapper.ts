import { TaskDocument } from "../../models/Task";
import { ITaskDetailDto, ITaskDto } from "./TaskResponseDto";

export class TaskResponseMapper {

  static toTaskResponse(task: TaskDocument): ITaskDto {
    return {
      taskId: task._id.toString(),
      title: task.title,
      status: task.status,
      dueDate: task.dueDate.toISOString(),
      attachment: task.attachment ?? null
    };
  }

  static toTaskDetailResponse(task: TaskDocument): ITaskDetailDto {
    return {
      taskId: task._id.toString(),
      title: task.title,
      status: task.status,
      dueDate: task.dueDate.toISOString(),
      attachment: task.attachment ?? null,
      createdAt: task.createdAt?.toISOString() ?? "",
      updatedAt: task.updatedAt?.toISOString() ?? "",
    };
  }

  static toTaskList(tasks: TaskDocument[]): ITaskDto[] {
    return tasks.map((task) => this.toTaskResponse(task));
  }
}
