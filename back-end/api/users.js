const express = require('express');
const router = express.Router();
const utils = require('../utils');

const userController = require('../controllers/users');

router.post('/', utils.validator.registrationDataValidator(), userController.register);
router.post('/auth', utils.validator.loginDataValidator(), userController.login);

router.get('/:id', utils.auth, userController.profileRead);
router.patch('/:id', utils.auth, userController.profileEdit);

router.get('/:id/orders', userController.getOrders);

module.exports = router;