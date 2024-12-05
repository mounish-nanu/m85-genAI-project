import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Summary from './components/Summary';
import Reports from './components/Reports';
import Navbar from './components/Navbar';
import { getToken } from './utils/auth';
import './styles.css';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!getToken());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/summary" element={isAuthenticated ? <Summary /> : <Navigate to="/" />} />
        <Route path="/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
