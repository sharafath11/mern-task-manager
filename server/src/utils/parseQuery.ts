import { ITaskQueryParams } from "../types/task.types";

export const parseStatus = (value: any): ITaskQueryParams["status"] => {
  const allowed = ["all", "todo", "in-progress", "completed", "overdue"];
  return allowed.includes(value) ? (value as ITaskQueryParams["status"]) : "all";
};

export const parseSort = (value: any): ITaskQueryParams["sort"] => {
  const allowed = ["date_desc", "date_asc", "title_asc", "title_desc"];
  return allowed.includes(value) ? (value as ITaskQueryParams["sort"]) : "date_desc";
};
