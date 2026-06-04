import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, processing: 0, delivered: 0, cancelled: 0 });
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Orders');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // State to handle viewing order details
  const [viewingOrder, setViewingOrder] = useState(null);
  
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/dashboard');
      const data = await response.json();
      if (response.ok) setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders?page=${page}&limit=10&search=${search}&status=${statusFilter}`);
      const data = await response.json();
      if (response.ok) {
        setOrders(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch orders', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      fetchOrders();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter, page]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, remarks: `Status updated to ${newStatus} by Admin` })
      });
      const data = await response.json();
      if (response.ok) {
        // Update detailed view if currently viewing
        if (viewingOrder && viewingOrder._id === orderId) {
          setViewingOrder(data.data);
        }
        // Refresh lists and stats
        fetchOrders();
        fetchStats();
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const handleLogout = () => {
    // Clear admin authentication data from local storage
    localStorage.removeItem('adminToken'); // Adjust the key if you use a different one
    navigate('/admin-login');
  };

  // ----------------------------------------------------
  // Order Details View
  // ----------------------------------------------------
  if (viewingOrder) {
    return (
      <div className="admin-dashboard">
        <button className="back-btn" onClick={() => setViewingOrder(null)}>← Back to Orders</button>
        
        <div className="order-details-card">
          <h2>Order Details</h2>
          <div className="details-grid">
            <p><strong>Order ID:</strong> {viewingOrder.order_number}</p>
            <p><strong>Customer:</strong> {viewingOrder.customer_name}</p>
            <p><strong>Email:</strong> {viewingOrder.customer_email}</p>
            <p><strong>Status:</strong> <span className={`badge ${viewingOrder.status.toLowerCase()}`}>{viewingOrder.status}</span></p>
            <p><strong>Created Date:</strong> {new Date(viewingOrder.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="update-status-section">
            <h3>Update Status</h3>
            <select 
              value={viewingOrder.status} 
              onChange={(e) => handleStatusUpdate(viewingOrder._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="timeline-section">
            <h3>Status Timeline</h3>
            <div className="timeline">
              {viewingOrder.order_status_history.map((history, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-icon">✓</div>
                  <div className="timeline-content">
                    <h4>{history.status}</h4>
                    <small>{new Date(history.createdAt).toLocaleString()}</small>
                    <p>{history.remarks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Dashboard Main View
  // ----------------------------------------------------
  return (
    <div className="admin-dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
      </div>
      
      {/* 1. Dashboard Home (Summary Cards) */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card pending">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
        <div className="stat-card processing">
          <h3>Processing</h3>
          <p>{stats.processing}</p>
        </div>
        <div className="stat-card delivered">
          <h3>Delivered</h3>
          <p>{stats.delivered}</p>
        </div>
        <div className="stat-card cancelled">
          <h3>Cancelled</h3>
          <p>{stats.cancelled}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="controls-container">
        <input 
          type="text" 
          placeholder="Search Order ID, Name, Email..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="search-input"
        />
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)} 
          className="status-filter"
        >
          <option value="All Orders">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* 2. Orders Management Table */}
      <div className="table-responsive">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.order_number}</td>
                  <td>{order.customer_name}</td>
                  <td><span className={`badge ${order.status.toLowerCase()}`}>{order.status}</span></td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="view-btn" onClick={() => setViewingOrder(order)}>View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={page === 1} 
            onClick={() => setPage(p => p - 1)}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button 
            disabled={page === totalPages} 
            onClick={() => setPage(p => p + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}