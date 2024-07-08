import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if (!API_KEY) {
  throw new Error("VITE_API_KEY is not defined");
}

if (!BACKEND_URL) {
  throw new Error("VITE_BACKEND_URL is not defined");
}

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    config.headers["api_key"] = API_KEY;
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
