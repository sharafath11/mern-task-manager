export interface ITaskQueryParams {
  search?: string;
  sort?: "date_desc" | "date_asc" | "title_asc" | "title_desc";
  status?: "all"|"todo" | "in-progress" | "completed" | "overdue";
  page?: number;
  limit?: number;
}
