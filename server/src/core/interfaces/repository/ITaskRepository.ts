import { IBaseRepository } from "./IBaseRepository";
import { TaskDocument } from "../../../models/Task";

export interface ITaskRepository extends IBaseRepository<TaskDocument, TaskDocument> {
  findAllPaginated(
    filter: any,
    sort: any,
    skip: number,
    limit: number
  ): Promise<TaskDocument[]>;

  count(filter: any): Promise<number>;
}
