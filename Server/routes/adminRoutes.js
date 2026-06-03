const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');

// GET /api/admin/dashboard
router.get('/dashboard', getDashboardStats);

module.exports = router;