const express = require('express');
const router = express.Router();

const bookController = require('../controllers/books');

router.get('/', bookController.getBooks);

router.post('/', bookController.bookCreate);
router.get('/:id', bookController.bookDetails);
router.put('/:id', bookController.bookUpdate);
router.delete('/:id', bookController.bookDelete);

module.exports = router;