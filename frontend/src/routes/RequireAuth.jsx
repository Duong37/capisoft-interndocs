import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// RequireAuth
// - Guards a branch of routes (children rendered via <Outlet />)
// - If the user is NOT authenticated, redirects to /login
// - Preserves the current location in state so, after login, we can
//   navigate the user back to where they tried to go 
const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // `replace` avoids adding an extra history entry
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Authenticated → render nested routes
  return <Outlet />;
};

export default RequireAuth;
