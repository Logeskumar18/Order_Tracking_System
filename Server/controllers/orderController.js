const Order = require('../models/Order');

// @desc    Create a new order
// @route   POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { order_number, customer_name, customer_email } = req.body;
    
    const order = await Order.create({
      order_number,
      customer_name,
      customer_email,
      status: 'Pending',
      order_status_history: [{ status: 'Pending', remarks: 'Order placed' }]
    });

    res.status(201).json({ message: 'Order created successfully', data: order });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create order', error: error.message });
  }
};

// @desc    Get all orders with pagination and search
// @route   GET /api/orders?page=1&limit=10&search=John
const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search || '';
    const status = req.query.status || '';

    // Search filtering on order_number, customer_name, or customer_email
    const query = {};
    if (status && status !== 'All Orders') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { order_number: { $regex: search, $options: 'i' } },
        { customer_name: { $regex: search, $options: 'i' } },
        { customer_email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const orders = await Order.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Order.countDocuments(query);

    res.status(200).json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: orders
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    res.status(200).json({ data: order });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order', error: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Update overall status and embed the new history record
    order.status = status;
    order.order_status_history.push({ status, remarks: remarks || '' });
    
    await order.save();
    
    res.status(200).json({ message: 'Status updated successfully', data: order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};