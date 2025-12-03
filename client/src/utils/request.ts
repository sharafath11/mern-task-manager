import axiosInstance from "@/lib/axios";
import { showErrorToast, showInfoToast } from "./toast";

type ApiOptions = {
  showToast?: boolean;
};

const defaultOptions: ApiOptions = {
  showToast: true,
};

const handleApiError = (error: any, options: ApiOptions) => {
  console.error("API Error:", error);

  if (!options.showToast) return;

  const message = error?.response?.data?.msg || error.message || "Request failed";

  if (error.response?.status === 401) {
    showInfoToast("Please login again.");
  } else {
    showErrorToast(message);
  }
};
export const postRequest = async <T = any>(
  url: string,
  body: object | FormData,
  options: ApiOptions = defaultOptions
): Promise<T> => {
  try {
    const headers: Record<string, string> = {};
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const res = await axiosInstance.post(url, body, {
      headers,
      validateStatus: () => true, 
    });

    if (!res.data.ok && options.showToast) {
      showErrorToast(res.data.msg);
    }

    return res.data;
  } catch (error: any) {
    handleApiError(error, options);

    return {
      ok: false,
      msg: error?.response?.data?.msg || "Request failed",
    } as T;
  }
};
export const getRequest = async <T = any>(
  url: string,
  params?: object,
  options: ApiOptions = defaultOptions
): Promise<T> => {
  try {
    const res = await axiosInstance.get(url, {
      params,
      validateStatus: () => true,
    });

    if (!res.data.ok && options.showToast) {
      showErrorToast(res.data.msg);
    }

    return res.data;
  } catch (error: any) {
    handleApiError(error, options);

    return {
      ok: false,
      msg: "Request failed",
    } as T;
  }
};

export const patchRequest = async <T = any>(
  url: string,
  body: object,
  options: ApiOptions = defaultOptions
): Promise<T> => {
  try {
    const headers: Record<string, string> = {};
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const res = await axiosInstance.patch(url, body, {
      headers,
      validateStatus: () => true,
    });

    if (!res.data.ok && options.showToast) {
      showErrorToast(res.data.msg);
    }

    return res.data;
  } catch (error: any) {
    handleApiError(error, options);

    return {
      ok: false,
      msg: "Request failed",
    } as T;
  }
};

export const putRequest = async <T = any>(
  url: string,
  body: object | FormData,
  options: ApiOptions = defaultOptions
): Promise<T> => {
  try {
    const headers: Record<string, string> = {};
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const res = await axiosInstance.put(url, body, {
      headers,
      validateStatus: () => true,
    });

    if (!res.data.ok && options.showToast) {
      showErrorToast(res.data.msg);
    }

    return res.data;
  } catch (error: any) {
    handleApiError(error, options);

    return {
      ok: false,
      msg: "Request failed",
    } as T;
  }
};

export const deleteRequest = async <T = any>(
  url: string,
  params?: object,
  options: ApiOptions = defaultOptions
): Promise<T> => {
  try {
    const res = await axiosInstance.delete(url, {
      params,
      validateStatus: () => true,
    });

    if (!res.data.ok && options.showToast) {
      showErrorToast(res.data.msg);
    }

    return res.data;
  } catch (error: any) {
    handleApiError(error, options);

    return {
      ok: false,
      msg: "Request failed",
    } as T;
  }
};
