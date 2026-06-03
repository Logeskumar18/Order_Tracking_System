const mongoose = require('mongoose');

const orderStatusValues = [
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Cancelled'
];

// Represents the Order Status History Table (Embedded)
const orderStatusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: orderStatusValues,
    required: true,
  },
  remarks: {
    type: String,
    trim: true,
  }
}, { timestamps: { createdAt: true, updatedAt: false } }); // Only created_at is needed

const orderSchema = new mongoose.Schema({
  order_number: {
    type: String,
    required: true,
    unique: true,
  },
  customer_name: { type: String, required: true },
  customer_email: { type: String, required: true, lowercase: true },
  status: { type: String, enum: orderStatusValues, default: 'Pending' },
  
  // In MongoDB, we embed the history directly in the order document
  order_status_history: [orderStatusHistorySchema]
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Order', orderSchema);