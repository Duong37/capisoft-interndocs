import api from './api';

export const authService = {
  // Get current authenticated user from backend
  getCurrentUser: async () => {
    const response = await api.get('/users/auth/me/');
    return response.data;
  },

  // Register new user
  register: async (userData) => {
    console.log('Register service - sending data:', userData);
    const response = await api.post('/users/auth/register/', userData);
    return response.data;
  },

  // Register admin user
  registerAdmin: async (userData) => {
    const response = await api.post('/users/auth/register-admin/', userData);
    return response.data;
  },

  // Get all users (public endpoint)
  getUsers: async () => {
    const response = await api.get('/users/');
    return response.data;
  },
};

export default authService;