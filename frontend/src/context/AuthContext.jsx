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
    console.log('Login function called with email:', email);
    console.log('Firebase auth object:', auth ? 'exists' : 'null');
    
    try {
      console.log('Attempting Firebase signInWithEmailAndPassword...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Firebase login successful, user:', userCredential.user.email);
      
      setUser(userCredential.user);
      setIsAuthenticated(true);

      // Fetch backend user data after successful login
      console.log('Fetching backend user data after login...');
      await fetchBackendUser();

      return { success: true };
    } catch (error) {
      console.error('Login error in AuthContext:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
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
    if (!auth.currentUser) {
      console.log('No Firebase user, skipping backend user fetch');
      return;
    }

    console.log('Fetching backend user for:', auth.currentUser.email);
    setBackendLoading(true);
    
    try {
      const backendUserData = await authService.getCurrentUser();
      setBackendUser(backendUserData);
      console.log('Backend user fetched successfully:', backendUserData.email);
    } catch (error) {
      console.error('Error fetching backend user:', error.message);
      
      // Handle different error types
      if (error.response?.status === 404) {
        console.log('Backend user not found - user may need to register in Django');
      } else if (error.code === 'ECONNABORTED') {
        console.error('Backend request timed out - check API URL configuration');
      } else if (error.message.includes('Network Error') || error.code === 'ERR_NETWORK') {
        console.error('Network error - cannot reach backend server');
        console.error('For iOS: Make sure REACT_APP_API_URL is set to your local IP address');
      }
      
      // Set backendUser to null and continue - don't block the app
      setBackendUser(null);
    } finally {
      setBackendLoading(false);
      console.log('Backend user fetch complete');
    }
  };

  // Listen for Firebase auth state changes
  useEffect(() => {
    console.log('Setting up Firebase auth state listener');
    
    // Add a timeout safety net in case Firebase doesn't respond
    const safetyTimeout = setTimeout(() => {
      console.log('Firebase auth listener timeout - forcing loading to false');
      setLoading(false);
    }, 5000);
    
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      clearTimeout(safetyTimeout);
      console.log('Firebase auth state changed:', firebaseUser ? `User: ${firebaseUser.email}` : 'No user (logged out)');
      
      setUser(firebaseUser);
      setIsAuthenticated(!!firebaseUser);

      if (firebaseUser) {
        await fetchBackendUser();
      } else {
        console.log('No Firebase user, clearing backend user');
        setBackendUser(null);
      }

      console.log('Auth loading complete, setting loading to false');
      setLoading(false);
    });

    return () => {
      clearTimeout(safetyTimeout);
      unsubscribe();
    };
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
