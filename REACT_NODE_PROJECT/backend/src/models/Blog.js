// const mongoose = require("mongoose");

// const blogSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       lowercase: true,
//       trim: true,
//       minlength: [5, "Title must be at least 5 characters long"],
//     },
//     image: {
//       type: String,
//       default: "",
//     },
//     content: String,
//     tags: [String],
//     user: {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// const Blog = mongoose.model("Blog", blogSchema);

// module.exports = Blog;


const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String, // Add type explicitly
      lowercase: true,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
