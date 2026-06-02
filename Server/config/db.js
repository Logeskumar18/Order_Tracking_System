const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;

  if (!mongoUri) {
    throw new Error('MongoDB connection string is missing in environment variables.');
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected successfully');
};

module.exports = connectDB;
