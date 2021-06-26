const express = require('express');
const router = express.Router();

const utils = require('./../utils');

const bookController = require('../controllers/books');
const commentsController = require('../controllers/comments');

router.get('/', bookController.getBooks);
router.get('/upcoming', bookController.getUpcomingBooks);
router.get('/newest', bookController.getNewestBooks);
router.get('/bestselling', bookController.getBestsellingBooks);

router.post('/', utils.auth, bookController.postBook);
router.get('/:id', bookController.getBookDetails);
router.patch('/:id', utils.auth, bookController.patchBook);
router.delete('/:id', utils.auth, bookController.deleteBook);

router.get('/genres/:id', bookController.getBooksByGenre);

router.get('/:id/comments', commentsController.getBookComments);
router.post('/:id/comments', utils.auth, commentsController.postBookComment);

module.exports = router;