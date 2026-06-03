import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, delivered: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/orders?limit=1000`);
        const orders = response.data.data;
        
        setStats({
          total: orders.length,
          pending: orders.filter(o => o.status === 'Pending').length,
          delivered: orders.filter(o => o.status === 'Delivered').length,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="container mt-5 text-center">Loading Dashboard...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-primary text-center p-4">
            <h4>Total Orders</h4>
            <h2>{stats.total}</h2>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-dark bg-warning text-center p-4">
            <h4>Pending Orders</h4>
            <h2>{stats.pending}</h2>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success text-center p-4">
            <h4>Delivered Orders</h4>
            <h2>{stats.delivered}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}