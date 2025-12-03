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

  async findAllPaginated(
    filter: any,
    sort: any,
    skip: number,
    limit: number
  ): Promise<TaskDocument[]> {
    return TaskModel.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async count(filter: any): Promise<number> {
    return TaskModel.countDocuments(filter).exec();
  }
}
