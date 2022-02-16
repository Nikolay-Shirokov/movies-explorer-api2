const router = require('express').Router();
const {
  createMovie, getMovies, deleteMovieByID,
} = require('../controllers/movies');
const { validateNewMovieData, validateId } = require('../middlewares/validation');

router.post('/', validateNewMovieData, createMovie);
router.get('/', getMovies);
router.delete('/:id', validateId, deleteMovieByID);

module.exports = router;
