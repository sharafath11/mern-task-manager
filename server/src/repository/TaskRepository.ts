import { ITaskRepository } from "../core/interfaces/repository/ITaskRepository";
import { TaskModel, TaskDocument } from "../models/Task";
import { BaseRepository } from "./baseRepository";

export class TaskRepository
  extends BaseRepository<TaskDocument, TaskDocument>
  implements ITaskRepository
{
  constructor() {
    super(TaskModel);
  }
}
