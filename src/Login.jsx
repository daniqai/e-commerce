import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Importing the CSS file
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
const navigate=useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      // Save JWT token to localStorage
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('userId', response.data.user?.id );
      if (username==="admin"&&password==="admin@123"){
        localStorage.setItem('role', 'admin'); 
        navigate('/customerList')
      }
      else{
      setMessage('Login successful!');
      navigate('/List')
      }
      
    
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      {/* <div className="image-section">
        <img src="/shopping-apps.jpg" alt="E-commerce" className="ecommerce-image" />
      </div> */}
      <div className="form-section">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
          <br></br>
          <p>Don't have an account? <NavLink to={'/'}>Sign Up</NavLink></p>
        </form>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
