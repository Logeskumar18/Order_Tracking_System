const express = require('express');
const router = express.Router();
const { registerUser, loginUser, loginAdmin } = require('../controllers/authController');

// POST /api/auth/register & POST /api/auth/login
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin-login', loginAdmin);

module.exports = router;