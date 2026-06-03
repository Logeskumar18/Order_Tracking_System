import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import '../styles/Login.css';

export default function UserLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
   
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const registrationSuccess = location.state?.registrationSuccess;
  const registeredEmail = location.state?.registeredEmail;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      localStorage.setItem('orderTrackingUser', JSON.stringify(data.user));

      navigate('/user-home', { replace: true });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="login-page login-user">
      <div className="login-panel">
        <p className="login-badge">Customer Access</p>
        <h1>User Login</h1>
        <p className="login-subtitle">Track your orders, status updates, and delivery timeline.</p>

        {registrationSuccess ? (
          <div className="form-alert success" role="status">
            Registration successful. {registeredEmail ? `Sign in with ${registeredEmail}.` : 'Please sign in.'}
          </div>
        ) : null}

        {status.message ? (
          <div className={`form-alert ${status.type}`} role="alert">
            {status.message}
          </div>
        ) : null}

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="user-email">Email Address</label>
          <input
            id="user-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="user-password">Password</label>
          <input
            id="user-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <div className="login-row">
          
          </div>

          <button className="login-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="login-switch">
          New customer? <Link to="/user-register">Create an account</Link>
        </p>

       
      </div>
    </section>
  );
}
