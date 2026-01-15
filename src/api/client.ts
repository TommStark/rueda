import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_BASE_URL } from './constants/api';
import {
  HTTP_STATUS,
  MAX_RETRIES,
  BASE_DELAY_MS,
  REQUEST_TIMEOUT_MS,
} from './constants/http';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const config = error.config as InternalAxiosRequestConfig & {
      _retryCount?: number;
    };

    if (!config) {
      return Promise.reject(error);
    }

    const retryCount = config._retryCount || 0;
    const status = error.response?.status;

    const shouldRetry =
      status !== HTTP_STATUS.BAD_REQUEST &&
      status !== HTTP_STATUS.UNAUTHORIZED &&
      status !== HTTP_STATUS.FORBIDDEN &&
      status !== HTTP_STATUS.NOT_FOUND &&
      status !== HTTP_STATUS.TOO_MANY_REQUESTS &&
      retryCount < MAX_RETRIES;

    if (shouldRetry) {
      config._retryCount = retryCount + 1;
      const delay = BASE_DELAY_MS * Math.pow(2, retryCount);

      await new Promise(resolve => setTimeout(resolve, delay));

      return apiClient(config);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
