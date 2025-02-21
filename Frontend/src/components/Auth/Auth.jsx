import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Function to handle form submission for both login and signup
  const handleAuth = async (e) => {
    e.preventDefault();
    setError(''); // Reset the error state

    if (isLogin) {
      // Login logic
      try {
        const { data } = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          password,
        });

        // Log data to debug
        console.log('Login successful:', data);

        // Store token and user data in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to home page or dashboard
        navigate('/');
      } catch (error) {
        console.error('Login error:', error);
        setError(error.response?.data?.message || 'Something went wrong!');
      }
    } else {
      // Signup logic
      if (!name || !email || !password || !confirmPassword) {
        setError('All fields are required');
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords don't match");
        return;
      }

      try {
        const { data } = await axios.post('http://localhost:5000/api/auth/register', {
          name, // Include name
          email,
          password,
        });

        // Store token and user data in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to home page or dashboard
        navigate('/');
      } catch (error) {
        console.error('Signup error:', error);
        setError(error.response?.data?.message || 'Something went wrong!');
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleAuth}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <p className="error">{error}</p>}

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" className="auth-button">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p className="toggle-auth">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Auth;
