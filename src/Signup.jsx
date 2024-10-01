import React, { useState } from 'react'; 
import axios from 'axios';
import './Signup.css'; // Importing the CSS file
import { NavLink } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');


  const handleSignup = async (e) => {
    e.preventDefault();

    try {
    await axios.post('http://localhost:5000/signup', {
        username,
        password,
        email
      });

      // Store signup details in localStorage
      const newUser = { username, email, mobile };

      // Retrieve existing users from localStorage
     
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Add the new user to the list
      users.push(newUser);
      
      // Store the updated users list back in localStorage
      localStorage.setItem('users', JSON.stringify(users));
      setMessage('');
      setEmail('');
      setMobile('');
      setPassword('');
      setUsername('');

      alert('Signup successful! You can now login.')

      // Optionally redirect the user to login or another page
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="form-section">
        <h2 className="signup-title">Signup</h2>
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="number"
            placeholder="Phone number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input"
          />
          <button type="submit" className="signup-button">Signup</button>
          <br />
          <p>Already have an account? <NavLink to={'/login'}>Login</NavLink></p>
        </form>
        {message && <p className="signup-message">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
