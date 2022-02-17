const router = require('express').Router();
const {
  createMovie, getMovies, deleteMovieByID,
} = require('../controllers/movies');
const { validateNewMovieData, validateId } = require('../middlewares/validation');

router.post('/api/movies', validateNewMovieData, createMovie);
router.get('/api/movies', getMovies);
router.delete('/api/movies/:id', validateId, deleteMovieByID);

module.exports = router;
