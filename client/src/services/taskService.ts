import { getRequest, postRequest, putRequest, deleteRequest } from "@/utils/request";

export const taskService = {
  getTasks: () => getRequest("/tasks"),
  createTask: (formData: FormData) =>postRequest("/tasks", formData, true), 
  updateTask: (id: string, formData: FormData) =>putRequest(`/tasks/${id}`, formData, true),
  deleteTask: (id: string) =>deleteRequest(`/tasks/${id}`),
};
