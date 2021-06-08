const express = require('express');
const router = express.Router();

const utils = require('../utils');

const cartController = require('./../controllers/carts');

router.post('/:id', utils.auth, cartController.postCart);
router.get('/:id', utils.auth, cartController.getCart);
router.patch('/:id', utils.auth, cartController.patchCart);
router.delete('/:id', utils.auth, cartController.deleteCart);

module.exports = router;