import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = localStorage.getItem('orderTrackingUser');
        if (!storedUser) {
          navigate('/user-login');
          return;
        }
        const user = JSON.parse(storedUser);

        // Fetch all orders and filter to only show orders matching the user's email
        const response = await axios.get(`${API_BASE_URL}/api/orders?limit=1000`);
        const userOrders = response.data.data.filter(order => order.customer_email === user.email);
        
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

  if (loading) return <div className="container mt-5 text-center">Loading Orders...</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Order Listing</h2>
        <Link to="/create-order" className="btn btn-primary">Create New Order</Link>
      </div>
      
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID (Order Number)</th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan="5" className="text-center">No orders found.</td></tr>
            ) : (
              orders.map(order => (
                <tr key={order._id}>
                  <td>{order.order_number}</td>
                  <td>{order.customer_name}</td>
                  <td><span className={`badge bg-${order.status === 'Delivered' ? 'success' : order.status === 'Cancelled' ? 'danger' : 'warning text-dark'}`}>{order.status}</span></td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/order/${order._id}`} className="btn btn-sm btn-info text-white">View Details</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}