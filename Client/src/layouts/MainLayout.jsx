import React from 'react';
import Navigation from '../components/Navigation';
import '../styles/MainLayout.css';

export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <Navigation />
      <main className="main-content">
        {children}
      </main>
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h5>Order Tracking System</h5>
            <p>Streamline your order management with real-time tracking and updates.</p>
          </div>
          
          <div className="footer-section">
            <h5>Support</h5>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Order Tracking System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
