import { ITaskQueryParams } from "@/types/taskQuery";
import { getRequest, postRequest, putRequest, deleteRequest } from "@/utils/request";

export const taskService = {
  getTasks: (params?: ITaskQueryParams) => getRequest("/tasks", params),
  createTask: (formData: FormData) => postRequest("/tasks", formData, ), 
  updateTask: (id: string, formData: FormData) =>putRequest(`/tasks/${id}`, formData,),
  deleteTask: (id: string) =>deleteRequest(`/tasks/${id}`),
};
