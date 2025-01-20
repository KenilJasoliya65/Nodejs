const path = require("path");
const movies = require("../models/movie");
const fs = require("fs");

const getMovies = async (req, res) => {
  const allMovies = await movies.find();
  res.json({
    movies: allMovies,
  });
};

const createmovies = (req, res) => {
  const image = req.file.filename;
  const { MovieName, Director, Relase_date, Cast } = req.body;

  movies.create({ MovieName, Director, Relase_date, Cast, image });

  res.json({
    msg: "Movie Collection Created",
  });
};

const UpdateMovie = async (req, res) => {
  try {
    const Movie_id = req.params["Movie_id"];
    const Movie_data = req.body;
    const SingleData = await movies.findOne({ _id: Movie_id });

    if (!SingleData) {
      return res.json({
        msg: "Movie Does Not Exist",
      });
    } else {
      if (Movie_data["MovieName"]) {
        SingleData["MovieName"] = Movie_data["MovieName"];
      }
      if (Movie_data["Director"]) {
        SingleData["Director"] = Movie_data["Director"];
      }
      if (Movie_data["Relase_date"]) {
        SingleData["Relase_date"] = Movie_data["Relase_date"];
      }
      if (req.file && req.file.filename) {
        oldfilename = SingleData["image"];
        if (oldfilename !== "") {
          const oldfilepath = path.join(
            __dirname,
            "..",
            "..",
            "public",
            "images",
            oldfilename
          );
          fs.unlinkSync(oldfilepath);
        }
        SingleData["image"] = req.file.filename;
      }
      if (Movie_data["Cast"]) {
        const index = SingleData.Cast.indexOf(Movie_data.Cast.old);
        SingleData.Cast.set(index, Movie_data.Cast.new);
      }
      await SingleData.save();
      return res.json({
        msg: "Movie Data Updated Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      msg: "Internal server error",
      err: error,
    });
  }
};

const deleteMovie = async (req, res) => {
  const Movie_id = req.params["Movie_id"];
  const SingleData = await movies.findById(Movie_id);
  try {
    if (!SingleData) {
      return res.json({
        msg: "this movie does not exist",
      });
    } else {
      await movies.deleteOne({ _id: Movie_id });
    }
    return res.json({
      msg: "movie removed",
    });
  } catch (error) {
    res.json({
      msg: "Internal server error",
      err: error,
    });
  }
};
module.exports = { getMovies, createmovies, UpdateMovie, deleteMovie };
