import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Placeholder for API integration
    console.log('Admin login payload:', formData);
  };

  return (
    <section className="login-page login-admin">
      <div className="login-panel">
        <p className="login-badge">Restricted Portal</p>
        <h1>Admin Login</h1>
        <p className="login-subtitle">Manage orders, update statuses, and monitor operations.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="admin-username">Admin Username</label>
          <input
            id="admin-username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="admin.username"
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

          <button className="login-btn" type="submit">Access Admin Panel</button>
        </form>

        <p className="login-switch">
          Customer account? <Link to="/user-login">Go to User Login</Link>
        </p>
      </div>
    </section>
  );
}
