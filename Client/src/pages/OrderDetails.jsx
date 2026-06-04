import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [statusInput, setStatusInput] = useState('');
  const [remarksInput, setRemarksInput] = useState('');

  const statusOptions = [
    'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'
  ];

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/orders/${id}`);
      const fetchedOrder = response.data.data;
      
      // Security check: ensure the order belongs to the logged-in user
      const storedUser = localStorage.getItem('orderTrackingUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (fetchedOrder.customer_email !== user.email) {
          alert('You are not authorized to view this order.');
          navigate('/orders');
          return;
        }
      }

      setOrder(fetchedOrder);
      setStatusInput(fetchedOrder.status);
    } catch (error) {
      console.error('Error fetching order:', error);
      alert('Order not found');
      navigate('/orders');
    }
  };

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/api/orders/${id}/status`, {
        status: statusInput,
        remarks: remarksInput
      });
      setRemarksInput('');
      fetchOrder(); // refresh data to update timeline
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const getTimelineSteps = () => {
    const history = order.order_status_history.map(h => ({ ...h, completed: true }));
    const standardSteps = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];
    
    if (order.status === 'Cancelled') {
      return history;
    }

    const currentStepIndex = standardSteps.indexOf(order.status);
    
    if (currentStepIndex !== -1) {
      const remainingSteps = standardSteps.slice(currentStepIndex + 1).map(step => ({
        status: step,
        completed: false
      }));
      return [...history, ...remainingSteps];
    }
    
    return history;
  };

  if (!order) return <div className="container mt-5 text-center">Loading Order Details...</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Order Details</h2>
        <button onClick={() => navigate('/orders')} className="btn btn-outline-secondary">Back to Orders</button>
      </div>

      <div className="row">
        {/* Order Information */}
        <div className="col-md-5 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-dark text-white">Order Information</div>
            <div className="card-body">
              <p><strong>Order ID:</strong> {order.order_number}</p>
              <p><strong>Customer Name:</strong> {order.customer_name}</p>
              <p><strong>Email:</strong> {order.customer_email}</p>
              <p><strong>Product Details:</strong> {order.product_details || 'N/A'}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Current Status:</strong> <span className="badge bg-primary fs-6">{order.status}</span></p>
              <p><strong>Created On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Update Status */}
        <div className="col-md-7 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-secondary text-white">Update Status</div>
            <div className="card-body">
              <form onSubmit={handleStatusUpdate}>
                <div className="mb-3">
                  <label className="form-label">New Status</label>
                  <select className="form-select" value={statusInput} onChange={e => setStatusInput(e.target.value)}>
                    {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Remarks / Notes</label>
                  <input type="text" className="form-control" placeholder="Optional remark" 
                         value={remarksInput} onChange={e => setRemarksInput(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Update Status</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="card shadow-sm mb-5">
        <div className="card-header bg-light"><strong>Status Timeline Tracking</strong></div>
        <div className="card-body p-0">
          <ul className="list-group list-group-flush">
            {getTimelineSteps().map((step, idx) => (
              <li key={step._id || idx} className="list-group-item d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center">
                  <div className="me-3 fs-5">
                    {step.completed ? (
                      <i className="fas fa-check-circle text-success"></i>
                    ) : (
                      <i className="far fa-circle text-muted"></i>
                    )}
                  </div>
                  <div>
                    <h6 className={`mb-1 ${step.completed ? 'text-primary' : 'text-muted'}`}>{step.status}</h6>
                    {step.completed && <small className="text-muted">{step.remarks || 'No remarks'}</small>}
                  </div>
                </div>
                {step.completed && step.createdAt && (
                  <span className="badge bg-light text-dark border">{new Date(step.createdAt).toLocaleString()}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}