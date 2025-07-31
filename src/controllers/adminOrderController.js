const asyncHandler = require('express-async-handler');
const Order = require('../models/adminOrderModel');

// GET /api/admin/orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .select('totalPrice paymentMethod _id user shippingAddress orderItems isPaid createdAt');

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});

// PUT /api/admin/orders/:id
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    res.status(404);
    throw new Error('Pedido no encontrado');
  }

  order.isPaid = true; // O puedes usar otro campo si usas algo como order.status = 'listo';

  const updatedOrder = await order.save();

  res.status(200).json({
    success: true,
    message: 'Pedido actualizado a listo',
    order: updatedOrder,
  });
});
  

module.exports = {
  updateOrderStatus,
  getAllOrders,
};
