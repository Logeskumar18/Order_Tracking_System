import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page login-admin">
      <div className="login-panel">
        <p className="login-badge">Restricted Portal</p>
        <h1>Admin Login</h1>
        <p className="login-subtitle">Manage orders, update statuses, and monitor operations.</p>

        {error && <div className="alert alert-danger" style={{ color: '#d9534f', textAlign: 'center', marginBottom: '15px' }}>{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="admin-email">Admin Email</label>
          <input
            id="admin-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@example.com"
            required
          />

          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter admin password"
            required
          />

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Access Admin Panel'}
          </button>
        </form>

        <p className="login-switch">
          Customer account? <Link to="/user-login">Go to User Login</Link>
        </p>
      </div>
    </section>
  );
}
