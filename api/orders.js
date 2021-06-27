const express = require('express');
const router = express.Router();

const utils = require('./../utils');
const orderController = require('./../controllers/orders');

router.get('/', utils.auth, orderController.getOrders);

router.post('/', utils.auth, orderController.postOrder);
router.get('/:id', utils.auth, orderController.getOrder);
router.patch('/:id', utils.auth, orderController.patchOrder);

module.exports = router