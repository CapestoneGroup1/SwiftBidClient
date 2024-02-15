import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { env } from "../utils/env";

export default class APIService {
  private static instance: APIService;
  private axiosInstance: AxiosInstance;

  private constructor(baseURL = "") {
    this.axiosInstance = axios.create({
      baseURL,
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status !== 401) {
          return Promise.reject(error);
        } else if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): AxiosInstance {
    if (!APIService.instance) {
      APIService.instance = new APIService(env.serverBaseUrl);
    }
    return APIService.instance.axiosInstance;
  }
}
