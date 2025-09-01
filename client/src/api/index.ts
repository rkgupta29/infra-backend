import axios, { type AxiosRequestConfig, type AxiosResponse, type  InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export type APIRequestMethods = "POST" |"GET" |"PUT" |"DELETE" |"PATCH" |"OPTIONS" |"HEAD"
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = Cookies.get('auth_token_admin');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiRequest = async <T, R = any>(
  method: APIRequestMethods,
  url: string,
  data?: R,
  options?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api({
      method,
      url,
      data,
      ...options,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
