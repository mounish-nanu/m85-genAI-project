import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/summary">Summary</Link>
      <Link to="/reports">Reports</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
