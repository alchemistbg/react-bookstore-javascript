const express = require('express');
const router = express.Router();
const utils = require('../utils')

const userController = require('../controllers/users');

router.post('/', utils.validator.registrationDataValidator(), userController.register);
router.post('/auth', userController.login);

router.get('/:id', userController.profileRead);

module.exports = router;