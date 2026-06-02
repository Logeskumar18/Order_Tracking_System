import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import '../styles/Login.css';

export default function UserRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    if (formData.password !== formData.confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      setStatus({ type: 'success', message: data.message || 'Registration successful.' });
      navigate('/user-login', {
        state: {
          registrationSuccess: true,
          registeredEmail: formData.email,
        },
      });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="login-page register-user">
      <div className="login-panel login-panel--wide">
        <p className="login-badge">New Customer</p>
        <h1>User Register</h1>
        <p className="login-subtitle">Create your account to place orders and track delivery progress.</p>

        {status.message ? (
          <div className={`form-alert ${status.type}`} role="alert">
            {status.message}
          </div>
        ) : null}

        <form className="login-form register-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label htmlFor="register-name">Full Name</label>
              <input
                id="register-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="register-phone">Phone Number</label>
              <input
                id="register-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
              />
            </div>
          </div>

          <label htmlFor="register-email">Email Address</label>
          <input
            id="register-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="register-address">Address</label>
          <textarea
            id="register-address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Delivery address"
            rows="3"
          />

          <div className="form-grid">
            <div>
              <label htmlFor="register-password">Password</label>
              <input
                id="register-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                required
              />
            </div>

            <div>
              <label htmlFor="register-confirm-password">Confirm Password</label>
              <input
                id="register-confirm-password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                required
              />
            </div>
          </div>

          <button className="login-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="login-switch">
          Already registered? <Link to="/user-login">Go to User Login</Link>
        </p>
      </div>
    </section>
  );
}
