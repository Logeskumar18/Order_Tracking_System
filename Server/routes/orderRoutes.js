const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');

router.route('/').post(createOrder).get(getOrders);
router.route('/:id').get(getOrderById).delete(deleteOrder);
router.route('/:id/status').put(updateOrderStatus);

module.exports = router;