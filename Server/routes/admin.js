const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const User = require('../models/User');
const Order = require('../models/Order');
const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Check if admin exists
  const admin = await User.findOne({ email, role: { $in: ['admin', 'super-admin'] } });
  if (!admin) return res.status(401).json({ message: 'Unauthorized' });

  // Verify password
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: 'Unauthorized' });

  // Generate token
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '8h' });

  res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } });
});

// Get all users
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  res.json(users);
});

// Get all orders
router.get('/orders', authMiddleware, adminMiddleware, async (req, res) => {
  const orders = await Order.find().populate('user', 'name email');
  res.json(orders);
});

module.exports = router;