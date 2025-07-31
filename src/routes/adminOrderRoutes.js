const express = require('express');
const { getAllOrders, updateOrderStatus } = require('../controllers/adminOrderController');
const verifyAdminToken = require('../middleware/adminAuthMiddleware');

const router = express.Router();

// GET /api/admin/orders
router.get('/', verifyAdminToken, getAllOrders);
router.put('/:id',verifyAdminToken,updateOrderStatus);


module.exports = router;
