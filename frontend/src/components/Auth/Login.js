import React, { useState } from 'react';
import './Auth.css';

const Login = ({ onLogin, onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Set loading state to true (disables button, shows loading text)
    setLoading(true);

    // Make POST request to backend login endpoint
    // Uses environment variable for API URL, falls back to Railway production URL
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || 'https://expensetrackertestrailway-production.up.railway.app'}/api/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      // Check if response was unsuccessful
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and call parent callback
      localStorage.setItem('token', data.token);
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Email and password input field
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Expense Tracker</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="toggle-link">
          Don't have an account?{' '}
          <span onClick={onToggleMode}>Register here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
