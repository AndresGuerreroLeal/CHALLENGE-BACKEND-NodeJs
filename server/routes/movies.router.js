const router = require('express').Router();

const MovieService = require('../services/movie.service');
const validatorHandler = require('../middleware/validator.handler');
const {
  createMovieSchema,
  updateMovieSchema,
  getMovieSchema,
} = require('../schemas/movie.schema');

const service = new MovieService();

router.get('/', async (req, res, next) => {
  try {
    const movies = await service.find();
    res.json(movies);
  } catch (error) {
    next(error);
  }
});
router.post(
  '/',
  validatorHandler(createMovieSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const newMovie = await service.create(body);
      res.json(newMovie);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-character', async (req, res, next) => {
  try {
    const { body } = req;
    const newCharacter = await service.addCharacter(body);
    res.json(newCharacter);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getMovieSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const movie = await service.findOne(id);
      res.json(movie);
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  '/:id',
  validatorHandler(getMovieSchema, 'params'),
  validatorHandler(updateMovieSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const movie = await service.update(id, body);
      res.json(movie);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getMovieSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.json(id);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
