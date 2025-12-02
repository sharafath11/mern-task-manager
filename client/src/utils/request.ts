import axiosInstance from "@/lib/axios";
import { ApiOptions, ApiResponse, defaultOptions } from "@/types/response";

const handleApiError = (error: any, options: ApiOptions) => {
  console.error("API Error:", error);

  if (!options.showToast) return;

  const message = error?.response?.data?.msg || error.message || "Request failed";

  if (error.response?.status === 401) {
    console.log("Unauthorized - Please login again.");
  } else {
    console.log(message);
  }
};

export const postRequest = async <T = any>(
  url: string,
  body: any,
  isFormData: boolean = false,
  options: ApiOptions = defaultOptions
): Promise<ApiResponse<T> | null> => {
  try {
    const headers: Record<string, string> = {};

    if (isFormData) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }

    const res = await axiosInstance.post(url, body, { headers });

    if (!res.data.ok) throw new Error(res.data.msg || "Request failed");

    return res.data;
  } catch (error: any) {
    handleApiError(error, options);
    return null;
  }
};

export const getRequest = async <T = any>(
  url: string,
  params?: object,
  options: ApiOptions = defaultOptions
): Promise<ApiResponse<T> | null> => {
  try {
    const res = await axiosInstance.get(url, params ? { params } : {});
    if (!res.data.ok) throw new Error(res.data.msg || "Request failed");
    return res.data;
  } catch (error: any) {
    handleApiError(error, options);
    return null;
  }
};

export const putRequest = async <T = any>(
  url: string,
  body: any,
  isFormData: boolean = false,
  options: ApiOptions = defaultOptions
): Promise<ApiResponse<T> | null> => {
  try {
    const headers: Record<string, string> = {};

    if (isFormData) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }

    const res = await axiosInstance.put(url, body, { headers });
    if (!res.data.ok) throw new Error(res.data.msg || "Request failed");

    return res.data;
  } catch (error: any) {
    handleApiError(error, options);
    return null;
  }
};

export const deleteRequest = async <T = any>(
  url: string,
  options: ApiOptions = defaultOptions
): Promise<ApiResponse<T> | null> => {
  try {
    const res = await axiosInstance.delete(url);
    if (!res.data.ok) throw new Error(res.data.msg || "Request failed");

    return res.data;
  } catch (error: any) {
    handleApiError(error, options);
    return null;
  }
};
