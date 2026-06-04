import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleUserLogout = () => {
    // Clear user authentication data from local storage
    localStorage.removeItem('orderTrackingUser'); 
    setIsOpen(false);
    navigate('/user-login');
  };

  // Check if a user is logged in
  const isUserLoggedIn = !!localStorage.getItem('orderTrackingUser');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Order Tracking
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
           
          
           
      
            {isUserLoggedIn ? (
              <li className="nav-item">
                <button 
                  className="nav-link" 
                  onClick={handleUserLogout}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                >
                  User Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive('/user-login') ? 'active' : ''}`}
                  to="/user-login"
                  onClick={() => setIsOpen(false)}
                >
                  User Login
                </Link>
              </li>
            )}
      
         
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
