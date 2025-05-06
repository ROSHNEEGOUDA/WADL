import axios from 'axios';
import type { LoginCredentials, RegisterCredentials, User } from '../types/user';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const register = async (credentials: RegisterCredentials): Promise<User> => {
  const response = await api.post('/users/register', credentials);
  return response.data;
};

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const updateProfile = async (userData: Partial<User>): Promise<User> => {
  const response = await api.put('/users/profile', userData);
  return response.data;
};

export default api;