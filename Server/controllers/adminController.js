// Server/controllers/adminController.js
import Order from '../models/order.js';

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'id name email')
      .sort('-createdAt');
    
    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Admin getOrders error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Admin updateStatus error:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};