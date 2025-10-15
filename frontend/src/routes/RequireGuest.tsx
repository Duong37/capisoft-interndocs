import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// RequireGuest
// - Guards public-only routes such as /login
// - If the user IS authenticated already, sends them to the app home
// - Checks both Firebase authentication and backend user data

const RequireGuest = () => {
  const { isAuthenticated, loading, backendUser } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Check if user is fully authenticated (Firebase + backend)
  const isFullyAuthenticated = isAuthenticated && backendUser;

  if (isFullyAuthenticated) {
    // Authenticated users shouldn't see guest pages
    return <Navigate to="/dashboard" replace />;
  }

  // Not fully authenticated → render public nested routes
  return <Outlet />;
};

export default RequireGuest;
