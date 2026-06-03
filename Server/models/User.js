const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Ensures the password isn't returned in queries by default
  },
  role: {
    type: String,
    enum: ['Customer', 'Admin'],
    default: 'Customer',
  },
  // Extra fields used by the existing authController
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  isActive: { type: Boolean, default: true },
}, { 
  timestamps: true // Automatically manages createdAt and updatedAt
});

module.exports = mongoose.model('User', userSchema);