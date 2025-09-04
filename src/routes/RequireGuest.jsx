import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// RequireGuest
// - Guards public-only routes such as /login
// - If the user IS authenticated already, sends them to the app home
//   (dashboard), preventing access to auth pages
const RequireGuest = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    // Authenticated users shouldn't see guest pages
    return <Navigate to="/dashboard" replace />;
  }
  // Not authenticated → render public nested routes
  return <Outlet />;
};

export default RequireGuest;
