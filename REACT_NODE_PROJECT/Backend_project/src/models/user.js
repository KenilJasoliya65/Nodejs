const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      // lowercase: true,
      // trim: true,
    },
    password: {
      type: String,
      // required: true
    },
    email: {
      type: String,
      // required: true,
      // unique: true,
    },
    loginHistory: [{ type: Date }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
