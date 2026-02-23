import { authApi } from './api';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string;
  is_admin: boolean;
}

interface CheckAuthResponse {
  is_authenticated: boolean;
  username: string | null;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await authApi.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await authApi.post('/auth/logout');
};

export const checkAuth = async (): Promise<CheckAuthResponse> => {
  const response = await authApi.get<CheckAuthResponse>('/auth/check');
  return response.data;
};