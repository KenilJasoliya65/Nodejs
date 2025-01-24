const express = require("express");
const {
  getBlog,
  getBlogOne,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controlers/blog");

const blogRoutes = express.Router();

blogRoutes.get("/", getBlog);
blogRoutes.post("/", createBlog);
blogRoutes.post("/", getBlogOne);
blogRoutes.put('/:id', updateBlog); // Update a blog by ID
blogRoutes.delete('/:id', deleteBlog); // Delete a blog by ID

module.exports = blogRoutes;


/*
const express = require('express');
const {getBlog , createBlog} = require('../controlers/blog');

const blogRoutes = express.Router();

blogRoutes.get('/' , getBlog);
blogRoutes.post('/' , createBlog);

module.exports = blogRoutes;
*/