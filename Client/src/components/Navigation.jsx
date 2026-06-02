import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-boxes"></i> Order Tracking
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                to="/"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/orders') ? 'active' : ''}`}
                to="/orders"
                onClick={() => setIsOpen(false)}
              >
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/create-order') ? 'active' : ''}`}
                to="/create-order"
                onClick={() => setIsOpen(false)}
              >
                Create Order
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                to="/dashboard"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                to="/profile"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/user-login') ? 'active' : ''}`}
                to="/user-login"
                onClick={() => setIsOpen(false)}
              >
                User Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/user-register') ? 'active' : ''}`}
                to="/user-register"
                onClick={() => setIsOpen(false)}
              >
                User Register
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/user-home') ? 'active' : ''}`}
                to="/user-home"
                onClick={() => setIsOpen(false)}
              >
                User Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/admin-login') ? 'active' : ''}`}
                to="/admin-login"
                onClick={() => setIsOpen(false)}
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
