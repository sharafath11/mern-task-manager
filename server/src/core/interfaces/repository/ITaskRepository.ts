import { IBaseRepository } from "./IBaseRepository";
import { TaskDocument } from "../../../models/Task";

export interface ITaskRepository extends IBaseRepository<TaskDocument, TaskDocument> {}
