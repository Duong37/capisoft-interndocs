import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the Dashboard page!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;