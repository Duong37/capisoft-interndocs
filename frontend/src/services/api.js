import axios from 'axios';
import { auth } from '../firebase';
import { Capacitor } from '@capacitor/core';

// Determine the API base URL based on the platform
const getApiBaseURL = () => {
  const platform = Capacitor.getPlatform();
  console.log('Running on platform:', platform);
  
  // Check if running on native platform (iOS or Android)
  if (Capacitor.isNativePlatform()) {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';
    console.log('Native platform - Using API URL:', apiUrl);
    return apiUrl;
  }
  
  // For web, use localhost or environment variable
  const apiUrl = 'http://127.0.0.1:8000/api';
  console.log('Web platform - Using API URL:', apiUrl);
  return apiUrl;
};

// Create axios instance
const api = axios.create({
  baseURL: getApiBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000, // 8 second timeout to prevent hanging
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
        // console.log('Token length:', token.length);
        // console.log('Token first 20 chars:', token.substring(0, 20) + '...');
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