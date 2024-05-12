const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setMovieGneres,
  setMovieActors,
  setMovieDirectors,
} = require("../controllers/movie.controllers");
const express = require("express");

const movieRouter = express.Router();

movieRouter.route("/movies").get(getAll).post(create);

movieRouter.route("/movies/:id").get(getOne).delete(remove).put(update);

movieRouter.route("/movies/:id/genres").post(setMovieGneres);

movieRouter.route("/movies/:id/actors").post(setMovieActors);

movieRouter.route("/movies/:id/directors").post(setMovieDirectors);

module.exports = movieRouter;
