const User = require('../models/User');
const bcrypt = require('bcryptjs');

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  address: user.address,
  role: user.role,
  isActive: user.isActive,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email, and password are required.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        message: 'A user with this email already exists.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone,
      address,
    });

    return res.status(201).json({
      message: 'User registered successfully.',
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error('registerUser error:', error.stack || error);

    if (error && error.name === 'ValidationError') {
      return res.status(400).json({
        message: Object.values(error.errors)
          .map((item) => item.message)
          .join(' '),
      });
    }

    return res.status(500).json({
      message: 'Failed to register user.',
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required.',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!user || !user.isActive) {
      return res.status(401).json({
        message: 'Invalid credentials.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials.',
      });
    }

    return res.status(200).json({
      message: 'Login successful.',
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to login user.',
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
