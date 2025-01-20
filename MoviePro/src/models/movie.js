const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  MovieName: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  Director: {
    type: String,
    require: true,
  },
  Relase_date: {
    type: String,
    require: true,
  },
  Cast: {
    type: [String],
    require: true,
  },
});
const Movies = mongoose.model("Movies", MovieSchema);

module.exports = Movies;
