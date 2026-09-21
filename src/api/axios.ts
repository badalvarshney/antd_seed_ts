import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { getToken } from '../utils';

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const mockEnv = import.meta.env.VITE_ENABLE_MOCK_API;

const ENABLE_MOCK: boolean =
  mockEnv === undefined || mockEnv === "" ? true : mockEnv === "true";
// const ENABLE_MOCK: boolean = import.meta.env.VITE_ENABLE_MOCK_API || true;

// Create standard Axios Instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000,
});

// Attach Token Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for 401 handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
    return Promise.reject(error);
  }
);

// Mock Adapter Helper for offline development & interactive testing
const mockDelay = (ms = 700): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const handleMockRequest = async (url: string, _method: 'GET' | 'POST', payload: any): Promise<AxiosResponse<any>> => {
  await mockDelay(600);

  if (url.includes('auth/login')) {
    const { email, password } = payload || {};
    if (password === 'wrongpass') {
      throw { response: { data: { success: false, message: 'Invalid email or password. Please try again.' }, status: 400 } };
    }
    const mockUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      firstName: email?.split('@')[0] || 'Cloud',
      lastName: 'User',
      email: email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      role: 'Admin',
    };
    const mockToken = 'jwt_mock_token_' + Date.now();
    return { data: { success: true, data: { user: mockUser, token: mockToken }, message: 'Login successful! Welcome back.' } } as AxiosResponse;
  }

  if (url.includes('auth/register')) {
    const mockUser = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      firstName: payload?.firstName || 'User',
      lastName: payload?.lastName || 'Name',
      email: payload?.email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + payload?.email,
      role: 'User',
    };
    const mockToken = 'jwt_mock_token_' + Date.now();
    return { data: { success: true, data: { user: mockUser, token: mockToken }, message: 'Registration successful! Welcome to Cloud Auth.' } } as AxiosResponse;
  }

  if (url.includes('auth/forgot-password')) {
    return { data: { success: true, message: `Password reset link sent to ${payload?.email}. Please check your inbox.` } } as AxiosResponse;
  }

  if (url.includes('auth/reset-password')) {
    return { data: { success: true, message: 'Password updated successfully! You can now log in.' } } as AxiosResponse;
  }

  if (url.includes('auth/resend-verification') || url.includes('auth/resend-otp')) {
    return { data: { success: true, message: 'A new 6-digit verification code has been sent to your registered email.' } } as AxiosResponse;
  }

  if (url.includes('auth/verify-email')) {
    const { code } = payload || {};

    if (code !== undefined) {
      if (!code || String(code).trim().length !== 6 || !/^\d{6}$/.test(String(code).trim())) {
        throw {
          response: {
            data: {
              success: false,
              message: 'Invalid verification code. Please enter a valid 6-digit numeric OTP code.',
            },
            status: 400,
          },
        };
      }
    }

    return { data: { success: true, message: 'Your email address has been verified successfully!' } } as AxiosResponse;
  }

  if (url.includes('auth/me')) {
    const rawUser = localStorage.getItem('auth_user');
    if (!rawUser) {
      throw { response: { data: { success: false, message: 'Session expired. Please sign in again.' }, status: 401 } };
    }
    return { data: { success: true, data: { user: JSON.parse(rawUser) } } } as AxiosResponse;
  }

  throw new Error(`Unhandled mock route ${url}`);
};

// Override post/get methods if ENABLE_MOCK is true
const originalPost = axiosInstance.post.bind(axiosInstance);
const originalGet = axiosInstance.get.bind(axiosInstance);

axiosInstance.post = (async <T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> => {
  if (ENABLE_MOCK) {
    return handleMockRequest(url, 'POST', data) as unknown as Promise<R>;
  }
  return originalPost(url, data, config) as Promise<R>;
}) as typeof axiosInstance.post;

axiosInstance.get = (async <T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> => {
  if (ENABLE_MOCK) {
    return handleMockRequest(url, 'GET', null) as unknown as Promise<R>;
  }
  return originalGet(url, config) as Promise<R>;
}) as typeof axiosInstance.get;

export default axiosInstance;
