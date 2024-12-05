import React, { useState } from 'react';
import axios from 'axios';
import { setToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });

      if (response.data.token) {
        setToken(response.data.token);
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      setError(error.response?.status === 401 ? 'Invalid credentials' : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p>{error}</p>}
        
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>

        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        
        <button type="submit" disabled={loading}>Login</button>
        {loading && <div style={{ textAlign: 'center', marginTop: '10px' }}><ClipLoader color="#007bff" /></div>}
      </form>
    </div>
  );
};

export default Login;
