import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/UserHome.css';

export default function UserHome() {
  return (
    <section className="user-home-page">
      <div className="user-home-shell">
        <header className="user-home-hero">
          <p className="user-home-badge">Customer Portal</p>
          <h1>Welcome to Your Order Dashboard</h1>
          <p>
            Create new orders, monitor your existing orders, view complete order details,
            and track every status update in timeline view.
          </p>
          <div className="user-home-hero-actions">
            <Link to="/create-order" className="hero-btn primary">
              Create Order
            </Link>
            <Link to="/orders" className="hero-btn secondary">
              View My Orders
            </Link>
          </div>
        </header>

        <div className="user-home-grid">
          <article className="action-card">
            <div className="action-icon">+</div>
            <h2>Create Order</h2>
            <p>Place a new order quickly with product details, quantity, and delivery address.</p>
            <Link to="/create-order" className="action-link">Open Create Order</Link>
          </article>

          <article className="action-card">
            <div className="action-icon">#</div>
            <h2>View Own Orders</h2>
            <p>See all your submitted orders in one place with search and pagination support.</p>
            <Link to="/orders" className="action-link">Open My Orders</Link>
          </article>

          
        </div>
      </div>
    </section>
  );
}
