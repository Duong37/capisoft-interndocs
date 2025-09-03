import React from 'react';
import { useAuth } from '../context/AuthContext';

const Users = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Users</h1>
      <p>Welcome to the Users page!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Users;