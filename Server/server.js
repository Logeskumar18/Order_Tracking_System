const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

const clientOrigin = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Order Tracking System API is running',
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'API gateway is active',
    clientOrigin,
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
