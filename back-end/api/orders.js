const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orders');

router.post('/', orderController.orderAdd);

// router.get('/', orderController.getOrders);
// router.get('/:id', orderController.getOrderById);

module.exports = router