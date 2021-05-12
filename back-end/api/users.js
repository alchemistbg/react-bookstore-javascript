const express = require('express');
const router = express.Router();

const utils = require('../utils');

const userController = require('../controllers/users');

router.post('/', utils.validator.registrationDataValidator(), userController.register);
router.post('/auth', utils.validator.loginDataValidator(), userController.login);

router.get('/:id', utils.auth, userController.getProfile);
router.patch('/:id', utils.auth, userController.patchProfile);

router.get('/:id/orders', utils.auth, userController.getUserOrders);

module.exports = router;