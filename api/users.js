const express = require('express');
const router = express.Router();

const utils = require('./../utils');

const userController = require('./../controllers/users');

router.post('/', utils.auth, userController.isLogged);
router.post('/register', utils.validator.registrationDataValidator(), userController.register);
router.post('/login', utils.validator.loginDataValidator(), userController.login);
router.post('/logout', utils.auth, userController.logout);

router.get('/:id', utils.auth, userController.getProfile);
router.patch('/:id', utils.auth, utils.validator.patchProfileValidator(), userController.patchProfile);
router.delete('/:id', utils.auth, userController.deleteProfile);

router.patch('/:id/pass', utils.auth, utils.validator.patchPasswordDataValidator(), userController.patchPassword);

router.get('/:id/orders', utils.auth, userController.getUserOrders);

module.exports = router;