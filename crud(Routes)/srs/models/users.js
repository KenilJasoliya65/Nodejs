const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  age: Number,
});

// users => User
// books => Book

const User = mongoose.model("User", userSchema);

// Local Array
// const users = [];

module.exports = {  User };
