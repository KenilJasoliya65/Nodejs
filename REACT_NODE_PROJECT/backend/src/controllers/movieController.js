const Movie = require("../models/movie");
const fs = require("fs");
const path = require("path");

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json({ movies });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }
    res.json({ movie });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

const createMovie = async (req, res) => {
  try {
    const { title, genre, director, releaseYear } = req.body;
    let image = req.file ? req.file.filename : "";
    const user = req.user; 

    const newMovie = await Movie.create({
      title,
      genre,
      director,
      releaseYear,
      image,
      user,
    });

    res.json({ msg: "Movie added successfully", movie: newMovie });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const movieData = req.body;

    let movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }

    movie.title = movieData.title || movie.title;
    movie.genre = movieData.genre || movie.genre;
    movie.director = movieData.director || movie.director;
    movie.releaseYear = movieData.releaseYear || movie.releaseYear;

    if (req.file) {
      if (movie.image) {
        const oldFilePath = path.join(
          __dirname,
          "..",
          "public",
          "images",
          movie.image
        );
        fs.unlinkSync(oldFilePath);
      }
      movie.image = req.file.filename;
    }

    await movie.save();
    res.json({ msg: "Movie updated successfully", movie });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }

    if (movie.image) {
      const filePath = path.join(
        __dirname,
        "..",
        "public",
        "images",
        movie.image
      );
      fs.unlinkSync(filePath);
    }

    await movie.deleteOne();
    res.json({ msg: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error });
  }
};

module.exports = { getMovies, getMovie, createMovie, updateMovie, deleteMovie };
