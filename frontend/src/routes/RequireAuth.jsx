import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// RequireAuth
// - Guards a branch of routes (children rendered via <Outlet />)
// - Checks both Firebase authentication and backend user data
// - If the user is NOT authenticated, redirects to /login
// - Preserves the current location in state so, after login, we can
//   navigate the user back to where they tried to go
const RequireAuth = () => {
  const { isAuthenticated, loading, backendUser } = useAuth();
  const location = useLocation();

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

  // Check if user is authenticated with Firebase AND has backend user data
  const isFullyAuthenticated = isAuthenticated && backendUser;

  if (!isFullyAuthenticated) {
    // `replace` avoids adding an extra history entry
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Fully authenticated → render nested routes
  return <Outlet />;
};

export default RequireAuth;
