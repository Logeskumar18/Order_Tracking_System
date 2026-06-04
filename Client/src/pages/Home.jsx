import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Order Tracking System</h1>
          <p className="hero-subtitle">
            Streamline your order management with real-time tracking and updates
          </p>
          <div className="hero-buttons">
            <Link to="/orders" className="btn btn-primary btn-lg">
              View Orders
            </Link>
            <Link to="/create-order" className="btn btn-outline-primary btn-lg">
              Create Order
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="order-icon">
            <i className="fas fa-box"></i>
          </div>
        </div>
      </section>


     
    </div>
  );
}
