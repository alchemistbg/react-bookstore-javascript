const express = require('express');
const router = express.Router();

const bookController = require('../controllers/books');

router.get('/', bookController.getBooks);
router.get('/upcoming', bookController.getUpcomingBooks);
router.get('/newest', bookController.getNewestBooks);
router.get('/bestselling', bookController.getBestsellingBooks);

router.post('/', bookController.bookCreate);
router.get('/:id', bookController.bookDetails);
router.put('/:id', bookController.bookUpdate);
router.delete('/:id', bookController.bookDelete);

router.get('/genres/:id', bookController.getBooksByGenre);

router.get('/:id/comments', bookController.bookGetComments);
router.post('/:id/comments', bookController.bookPostComment);

module.exports = router;