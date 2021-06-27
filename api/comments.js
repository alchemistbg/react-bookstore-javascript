const express = require('express');
const router = express.Router();

const utils = require('./../utils');

const commentsController = require('./../controllers/comments');

// router.get('/:id/comments', commentsController.getBookComments);
// router.post('/:id/comments', utils.auth, commentsController.postBookComment);

module.exports = router;