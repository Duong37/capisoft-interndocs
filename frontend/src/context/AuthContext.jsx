import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Capacitor } from '@capacitor/core';
import { auth as firebaseWebAuth } from '../firebase';
import { 
  signInWithEmailAndPassword as webSignIn,
  signOut as webSignOut,
  onAuthStateChanged
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
  const [FirebaseUser, setFirebaseUser] = useState(null); // Firebase user
  const [DjangoUser, setDjangoUser] = useState(null); // Django user
  const [loading, setLoading] = useState(true);
  const [backendLoading, setBackendLoading] = useState(false);

  // Platform detection
  const isNative = Capacitor.isNativePlatform();

  // Platform-aware Firebase authentication helpers
  const platformSignIn = async (email, password) => {
    if (isNative) {
      return await FirebaseAuthentication.signInWithEmailAndPassword({ email, password });
    } else {
      const userCredential = await webSignIn(firebaseWebAuth, email, password);
      return { user: userCredential.user };
    }
  };

  const platformSignOut = async () => {
    if (isNative) {
      return await FirebaseAuthentication.signOut();
    } else {
      return await webSignOut(firebaseWebAuth);
    }
  };

  const platformGetCurrentUser = async () => {
    if (isNative) {
      return await FirebaseAuthentication.getCurrentUser();
    } else {
      const user = firebaseWebAuth.currentUser;
      return { user };
    }
  };

  const login = async (email, password) => {
    console.log('Login attempt for:', email);

    try {
      const result = await platformSignIn(email, password);
      console.log('Firebase login successful');

      setFirebaseUser(result.user);
      setIsAuthenticated(true);

      // Fetch backend user data after successful login
      await fetchBackendUser();

      return { success: true };
    } catch (error) {
      console.error('Login error:', error.message);
      return { success: false, error: error.message };
    }
  };

  const register = async (formData) => {
    try {
      const { email, password, user_type } = formData;

      // Register with backend using appropriate endpoint based on user type
      if (user_type === 'ADMIN') {
        await authService.registerAdmin(formData);
      } else {
        await authService.register(formData);
      }

      // Sign in with Firebase after successful backend registration
      const result = await platformSignIn(email, password);

      setFirebaseUser(result.user);
      setIsAuthenticated(true);

      // Fetch backend user data
      try {
        const backendUserData = await authService.getCurrentUser();
        setDjangoUser(backendUserData);
      } catch (error) {
        console.error('Error fetching backend user after registration:', error.message);
      }

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await platformSignOut();
      setFirebaseUser(null);
      setDjangoUser(null);
      setIsAuthenticated(false);

      // Clear any stored auth data from localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      localStorage.removeItem('backendUser');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const fetchBackendUser = useCallback(async () => {
    try {
      const currentUser = await platformGetCurrentUser();
      if (!currentUser.user) {
        return;
      }

      setBackendLoading(true);

      try {
        const backendUserData = await authService.getCurrentUser();
        setDjangoUser(backendUserData);
      } catch (error) {
        console.error('Error fetching backend user:', error.message);

        // Set DjangoUser to null and continue - don't block the app
        setDjangoUser(null);
      } finally {
        setBackendLoading(false);
      }
    } catch (error) {
      console.error('Error getting current user from Firebase:', error);
      setDjangoUser(null);
      setBackendLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for Firebase auth state changes
  useEffect(() => {
    // Add a timeout safety net in case Firebase doesn't respond
    const safetyTimeout = setTimeout(() => {
      console.log('Firebase auth listener timeout - forcing loading to false');
      setLoading(false);
    }, 5000);

    let listenerHandle;
    let webUnsubscribe;

    const setupAuthListener = async () => {
      try {
        if (isNative) {
          // Native platform - use Capacitor plugin
          // Initial user check
          const currentUser = await FirebaseAuthentication.getCurrentUser();
          console.log('Initial auth state (native):', currentUser.user ? `User: ${currentUser.user.email}` : 'No user');

          setFirebaseUser(currentUser.user);
          setIsAuthenticated(!!currentUser.user);

          if (currentUser.user) {
            await fetchBackendUser();
          } else {
            setDjangoUser(null);
          }

          // Set up auth state change listener
          listenerHandle = await FirebaseAuthentication.addListener('authStateChange', async (user) => {
            clearTimeout(safetyTimeout);
            console.log('Auth state changed (native):', user.user ? `User: ${user.user.email}` : 'No user');

            setFirebaseUser(user.user);
            setIsAuthenticated(!!user.user);

            if (user.user) {
              await fetchBackendUser();
            } else {
              setDjangoUser(null);
            }

            setLoading(false);
          });

          setLoading(false);
        } else {
          // Web platform - use Firebase JS SDK
          console.log('Setting up web auth listener');
          webUnsubscribe = onAuthStateChanged(firebaseWebAuth, async (user) => {
            clearTimeout(safetyTimeout);
            console.log('Auth state changed (web):', user ? `User: ${user.email}` : 'No user');

            setFirebaseUser(user);
            setIsAuthenticated(!!user);

            if (user) {
              await fetchBackendUser();
            } else {
              setDjangoUser(null);
            }

            setLoading(false);
          });
        }
      } catch (error) {
        console.error('Error setting up Firebase auth listener:', error);
        clearTimeout(safetyTimeout);
        setLoading(false);
      }
    };

    setupAuthListener();

    return () => {
      clearTimeout(safetyTimeout);
      if (listenerHandle) {
        listenerHandle.remove();
      }
      if (webUnsubscribe) {
        webUnsubscribe();
      }
    };
  }, [fetchBackendUser, isNative]);

  const value = {
    isAuthenticated,
    user: FirebaseUser,
    FirebaseUser,
    backendUser: DjangoUser,
    DjangoUser,
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
