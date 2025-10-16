import axios from 'axios';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Capacitor } from '@capacitor/core';
import { auth as firebaseWebAuth } from '../firebase';
import { User as FirebaseUser } from 'firebase/auth';

// Determine the API base URL based on the platform
const getApiBaseURL = () => {
  const platform = Capacitor.getPlatform();
  console.log('Running on platform:', platform);

  // Check if running on native platform (iOS or Android)
  if (Capacitor.isNativePlatform()) {
    // For iOS simulator, use local IP address instead of localhost
    const apiUrl = process.env.REACT_APP_API_URL;
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
    try {
      const isNative = Capacitor.isNativePlatform();
      
      if (isNative) {
        // Native platform - use Capacitor plugin
        const currentUser = await FirebaseAuthentication.getCurrentUser();
        console.log('Request interceptor (native) - Current user:', currentUser.user?.email || 'No user');

        if (currentUser.user) {
          try {
            const tokenResult = await FirebaseAuthentication.getIdToken();
            config.headers.Authorization = `Bearer ${tokenResult.token}`;
            console.log('Added auth token to request:', config.url);
          } catch (error) {
            console.error('Error getting Firebase token:', error);
          }
        } else {
          console.log('No current user, no auth token added');
        }
      } else {
        // Web platform - use Firebase JS SDK
        if (!firebaseWebAuth) {
          console.log('Firebase auth not initialized yet');
          return config;
        }

        const user: FirebaseUser | null = firebaseWebAuth.currentUser;
        console.log('Request interceptor (web) - Current user:', user?.email || 'No user');

        if (user) {
          try {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Added auth token to request:', config.url);
          } catch (error) {
            console.error('Error getting Firebase token:', error);
          }
        } else {
          console.log('No current user, no auth token added');
        }
      }
    } catch (error) {
      console.error('Error getting current user:', error);
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