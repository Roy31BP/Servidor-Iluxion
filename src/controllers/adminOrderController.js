const asyncHandler = require('express-async-handler');
const Order = require('../models/adminOrderModel');

// GET /api/admin/orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .select('totalPrice paymentMethod _id user shippingAddress orderItems');

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

module.exports = {
  getAllOrders,
};
