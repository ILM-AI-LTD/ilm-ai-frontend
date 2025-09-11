import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
const streamingAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_STREAM_URL || "",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
const streamingEvaluationAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_STREAM_URL || "",
  headers: {
    "Content-Type": "multipart/form-data",
    // Accept: "application/json",
  },
  withCredentials: true,
  timeout: 240000,
});

const streamingMathEvaluationAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_STREAM_URL || "",
  // baseURL: "https://ilm-mathai-v0ws.onrender.com",
  headers: {
    "Content-Type": "multipart/form-data",
    // Accept: "application/json",
  },
  withCredentials: true,
});
// Shared request interceptor function
const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  config.headers = config.headers ?? {};
  if (typeof window !== "undefined") {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
};
// Shared response interceptor function
const responseInterceptor = {
  onFulfilled: (response: AxiosResponse) => response,
  onRejected: (error: AxiosError) => {
    const message =
      (error.response?.data as any)?.message ||
      error.message ||
      "Something went wrong";
    return Promise.reject(new Error(message));
  },
};
// Apply interceptors to both instances
axiosInstance.interceptors.request.use(requestInterceptor, (error) =>
  Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);
streamingAxiosInstance.interceptors.request.use(requestInterceptor, (error) =>
  Promise.reject(error)
);
streamingAxiosInstance.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);
streamingEvaluationAxiosInstance.interceptors.request.use(
  requestInterceptor,
  (error) => Promise.reject(error)
);
streamingEvaluationAxiosInstance.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);
streamingMathEvaluationAxiosInstance.interceptors.request.use(
  requestInterceptor,
  (error) => Promise.reject(error)
);
streamingMathEvaluationAxiosInstance.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);
// Main API request function
export async function apiRequest<T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> {
  const response = await axiosInstance({ url, ...config });
  return response.data;
}
// Streaming API request function
export async function streamingApiRequest<T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> {
  const response = await streamingAxiosInstance({ url, ...config });
  return response.data;
}
// Streaming API request function
export async function streamingApiEvaluationRequest<T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> {
  const response = await streamingEvaluationAxiosInstance({ url, ...config });
  return response.data;
}

//=========== Math Streaming API request function ==============
export async function streamingMathApiEvaluationRequest<T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> {
  const response = await streamingMathEvaluationAxiosInstance({
    url,
    ...config,
  });
  return response.data;
}
// Generic API request function with custom base URL
export async function customApiRequest<T>(
  url: string,
  baseURL: string,
  config: AxiosRequestConfig = {}
): Promise<T> {
  const customInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
  });
  // Apply the same interceptors
  customInstance.interceptors.request.use(requestInterceptor, (error) =>
    Promise.reject(error)
  );
  customInstance.interceptors.response.use(
    responseInterceptor.onFulfilled,
    responseInterceptor.onRejected
  );
  const response = await customInstance({ url, ...config });
  return response.data;
}
export default axiosInstance;
export { streamingAxiosInstance };
