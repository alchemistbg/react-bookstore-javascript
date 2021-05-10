const express = require('express');
const router = express.Router();

const utils = require('./../utils');

const bookController = require('../controllers/books');

router.get('/', bookController.getBooks);
router.get('/upcoming', bookController.getUpcomingBooks);
router.get('/newest', bookController.getNewestBooks);
router.get('/bestselling', bookController.getBestsellingBooks);

router.post('/', utils.auth, bookController.bookCreate);
router.get('/:id', bookController.bookDetails);
router.patch('/:id', utils.auth, bookController.bookUpdate);
router.delete('/:id', utils.auth, bookController.bookDelete);

router.get('/genres/:id', bookController.getBooksByGenre);

router.get('/:id/comments', bookController.bookGetComments);
router.post('/:id/comments', utils.auth, bookController.bookPostComment);

module.exports = router;