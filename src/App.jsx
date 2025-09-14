// App-level routing.
// Note:
// - Landing route redirects to `/login` (public).
// - Public pages are currently wrapped with `PublicRoute` and private pages with
//   `PrivateRoute` on each Route. In Step 2 we will refactor to grouped route
//   guards using `<RequireGuest />` and `<RequireAuth />` + `<Outlet />`, and
//   nest the `<Layout />` once for all private pages.
// - Layout (sidebar + content) is applied only to authenticated areas.
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Reviews from './components/Reviews';
import Layout from './components/Layout';
import RequireAuth from './routes/RequireAuth';
import RequireGuest from './routes/RequireGuest';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect bare landing to the dedicated login URL */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* Public-only group */}
          <Route element={<RequireGuest />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Private group with shared Layout (sidebar) */}
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/users" element={<Users />} />
            </Route>
          </Route>

          {/* Fallback: send unknown routes to dashboard if logged in, or login otherwise */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
