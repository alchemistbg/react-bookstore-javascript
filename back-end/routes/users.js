const express = require('express');
const router = express.Router();
const utils = require('../utils')

const userController = require('../controllers/users');

router.post('/', utils.validator.registrationDataValidator(), userController.register);
router.post('/auth', utils.validator.loginDataValidator(), userController.login);

router.get('/:id', userController.profileRead);

router.get('/:id/orders', userController.getOrders);

module.exports = router;