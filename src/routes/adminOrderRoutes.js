const express = require('express');
const { getAllOrders } = require('../controllers/adminOrderController');
const verifyAdminToken = require('../middleware/adminAuthMiddleware');

const router = express.Router();

// GET /api/admin/orders
router.get('/', verifyAdminToken, getAllOrders);

module.exports = router;
