const express = require('express');
const router = express.Router();

const genresController = require('./../controllers/genres');

router.get('/', genresController.getGenres);

router.post('/', genresController.genreAdd);
router.get('/:id', genresController.genreDetails);
router.put('/:id', genresController.genreEdit);
router.delete('/:id', genresController.genreDelete);

module.exports = router;