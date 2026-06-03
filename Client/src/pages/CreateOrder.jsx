import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export default function CreateOrder() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    product_details: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('orderTrackingUser');
    if (!storedUser) {
      navigate('/user-login');
    } else {
      const user = JSON.parse(storedUser);
      setFormData(prev => ({
        ...prev,
        customer_name: user.name || '',
        customer_email: user.email || '',
        address: user.address || ''
      }));
      setIsLoadingAuth(false);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Auto-generate order number for the backend
      const order_number = `ORD-${Math.floor(Date.now() / 1000)}`;
      
      await axios.post(`${API_BASE_URL}/api/orders`, {
        ...formData,
        order_number,
        status: 'Pending'
      });
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingAuth) return <div className="container mt-5 text-center">Checking authorization...</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Create New Order</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Customer Name</label>
                  <input type="text" className="form-control" required
                    value={formData.customer_name} 
                    readOnly
                    title="Name is auto-filled from your profile"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Customer Email</label>
                  <input type="email" className="form-control" required
                    value={formData.customer_email} 
                    readOnly
                    title="Email is auto-filled from your profile"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Product Details (Optional)</label>
                  <textarea className="form-control" rows="3" placeholder="Enter product details..."
                    value={formData.product_details} 
                    onChange={e => setFormData({...formData, product_details: e.target.value})} 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Address</label>
                  <textarea className="form-control" required rows="3" placeholder="Enter delivery address"
                    value={formData.address} 
                    onChange={e => setFormData({...formData, address: e.target.value})} 
                  />
                </div>
                <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}