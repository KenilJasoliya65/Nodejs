const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    tags : [],
})
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

