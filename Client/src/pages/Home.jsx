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

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-plus-circle"></i>
            </div>
            <h3>Create Orders</h3>
            <p>Easily create new orders with detailed information and specifications</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-list"></i>
            </div>
            <h3>Order Listing</h3>
            <p>View all your orders in an organized list with search and pagination</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-eye"></i>
            </div>
            <h3>Order Details</h3>
            <p>Access comprehensive details about each order with full history</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-sync-alt"></i>
            </div>
            <h3>Status Updates</h3>
            <p>Update and track order status in real-time with live notifications</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-timeline"></i>
            </div>
            <h3>Timeline Tracking</h3>
            <p>View order progress through an interactive status timeline</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-search"></i>
            </div>
            <h3>Advanced Search</h3>
            <p>Find orders quickly with powerful search filters and pagination</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-box">
            <h4 className="stat-number">1000+</h4>
            <p className="stat-label">Orders Processed</p>
          </div>
          <div className="stat-box">
            <h4 className="stat-number">99.9%</h4>
            <p className="stat-label">Uptime</p>
          </div>
          <div className="stat-box">
            <h4 className="stat-number">24/7</h4>
            <p className="stat-label">Support</p>
          </div>
          <div className="stat-box">
            <h4 className="stat-number">100%</h4>
            <p className="stat-label">Secure</p>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="quick-start-section">
        <h2 className="section-title">Quick Start Guide</h2>
        <div className="quick-start-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Create an Order</h4>
            <p>Navigate to "Create Order" and fill in the required details</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h4>Track Progress</h4>
            <p>Monitor your order status in real-time from the dashboard</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h4>Get Updates</h4>
            <p>Receive instant notifications for any status changes</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h4>Manage Orders</h4>
            <p>Update, review, or modify your orders as needed</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Begin managing your orders efficiently today</p>
          <Link to="/create-order" className="btn btn-primary btn-lg">
            Create Your First Order
          </Link>
        </div>
      </section>
    </div>
  );
}
