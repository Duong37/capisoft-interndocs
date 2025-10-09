import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Firebase user
  const [backendUser, setBackendUser] = useState(null); // Django user
  const [loading, setLoading] = useState(true);
  const [backendLoading, setBackendLoading] = useState(false);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsAuthenticated(true);

      // Fetch backend user data after successful login
      await fetchBackendUser();

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (formData) => {
    try {
      const { email, password, user_type } = formData;
      // console.log('Frontend registration attempt for email:', email, 'user_type:', user_type);
      // console.log('Registering with backend...', user_type === 'ADMIN' ? 'using admin endpoint' : 'using regular endpoint');

      // Register with backend using appropriate endpoint based on user type
      if (user_type === 'ADMIN') {
        await authService.registerAdmin(formData);
      } else {
        await authService.register(formData);
      }

      // console.log('Backend registration successful');

      // Sign in with Firebase after successful backend registration
      // console.log('Signing in with Firebase...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // console.log('Firebase sign-in successful:', userCredential.user.email);
      setUser(userCredential.user);
      setIsAuthenticated(true);

      // Fetch backend user data
      // console.log('Fetching backend user data...');
      try {
        const backendUserData = await authService.getCurrentUser();
        setBackendUser(backendUserData);
        console.log('Backend user data fetched successfully');
      } catch (error) {
        console.log('Error fetching backend user after registration:', error);
      }

      return { success: true };
    } catch (error) {
      console.log('Registration error:', error.code || error.name, error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setBackendUser(null);
      setIsAuthenticated(false);

      // Clear any stored auth data from localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      localStorage.removeItem('backendUser');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchBackendUser = async () => {
    if (!auth.currentUser) return;

    setBackendLoading(true);
    try {
      const backendUserData = await authService.getCurrentUser();
      setBackendUser(backendUserData);
    } catch (error) {
      console.error('Error fetching backend user:', error);
      // If backend user doesn't exist, user might need to register
      if (error.response?.status === 404) {
        // Backend user not found, might need registration
        console.log('Backend user not found, registration might be needed');
      }
    } finally {
      setBackendLoading(false);
    }
  };

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      setIsAuthenticated(!!firebaseUser);

      if (firebaseUser) {
        await fetchBackendUser();
      } else {
        setBackendUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    isAuthenticated,
    user,
    backendUser,
    loading: loading || backendLoading,
    login,
    register,
    logout,
    fetchBackendUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
