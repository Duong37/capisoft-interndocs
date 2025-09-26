import axios from 'axios';
import { auth } from '../firebase';

// Create axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Firebase token
api.interceptors.request.use(
  async (config) => {
    const currentUser = auth.currentUser;
    console.log('Request interceptor - Current user:', currentUser?.email || 'No user');

    if (currentUser) {
      try {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Added auth token to request:', config.url);
        console.log('Token length:', token.length);
        console.log('Token first 20 chars:', token.substring(0, 20) + '...');
      } catch (error) {
        console.error('Error getting Firebase token:', error);
      }
    } else {
      console.log('No current user, no auth token added');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    console.log('Successful response:', response.config.url, response.status);
    return response;
  },
  async (error) => {
    console.log('Error response:', error.config?.url, error.response?.status, error.response?.data);
    console.log('Error details:', JSON.stringify(error.response?.data, null, 2));
    const originalRequest = error.config;

    // Handle 401/403 errors (unauthorized)
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log('Auth error detected, redirecting to login');
      // Redirect to login page if not already there
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;