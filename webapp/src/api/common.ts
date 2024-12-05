import { AxiosRequestConfig, AxiosResponse } from "axios";
import api from "./apiConfig";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function httpRequest<T>(
  method: HttpMethod,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await api({
      method,
      url,
      data,
      ...config,
    });
    return response.data; //
  } catch (error) {
    console.error("HTTP Request Error:", error);
    throw error;
  }
}
