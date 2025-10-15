import api from './api';
import { User } from '../types';

export const authService = {
  // Get current authenticated user from backend
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/users/auth/me/');
    return response.data;
  },

  // Register new user
  register: async (userData: {
    email: string;
    password: string;
    user_type?: string;
  }) => {
    console.log('Register service - sending data:', userData);
    const response = await api.post('/users/auth/register/', userData);
    return response.data;
  },

  // Register admin user
  registerAdmin: async (userData: {
    email: string;
    password: string;
    user_type?: string;
    admin_code?: string;
  }) => {
    const response = await api.post('/users/auth/register-admin/', userData);
    return response.data;
  },

  // Get all users (public endpoint)
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/users/');
    return response.data;
  },
};

export default authService;