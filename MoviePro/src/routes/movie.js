const express = require("express");
const {
  getMovies,
  createmovies,
  UpdateMovie,
  deleteMovie,
} = require("../controlers/movie");

const upload = require("../middleware/upload");

const Movieroute = express.Router();

Movieroute.get("/", getMovies);
Movieroute.post("/", upload.single("image"), createmovies);
Movieroute.put("/:Movie_id", upload.single("image"), UpdateMovie);
Movieroute.delete("/:Movie_id", deleteMovie);

module.exports = Movieroute;
