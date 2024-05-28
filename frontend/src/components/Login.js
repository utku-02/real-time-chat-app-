import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Assuming you're using React Router
import axios from 'axios';
import '../style/login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const history = useHistory(); // For redirecting after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Choose the endpoint based on the available data
      const endpoint = email ? '/grp-6/auth/login' : '/user/login';
      const payload = email ? { email, password } : { username, password };
      
      const response = await axios.post(endpoint, payload);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);

      console.log(response.data);
      // Redirect or update state after successful login
      history.push('/dashboard'); // Replace with your desired route
    } catch (error) {
      setError('Invalid username/email or password.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email or Username:</label>
          <input 
            type="text" 
            value={email || username} 
            onChange={(e) => {
              setEmail(e.target.value);
              setUsername(e.target.value);
            }} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Login</button>
        {token && <p>Token: {token}</p>}
      </form>
      <div className="register-link">
        <span>Don't have an account?</span>
        <Link to="/register">Register here</Link>
      </div>
    </div>
  );
};

export default Login;
