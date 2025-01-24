const Blog  = require('../models/blog');

const getBlog = async (req , res) => {
    const allBlogs = await Blog.find();
    
    res.json({
        blogs : allBlogs,
    });
};

// const getBlogOne = async (req , rec) => {
//     const blogOne = await Blog.findById(req.params.id);

//     res.json({
//         blog : blogOne,
//     })
// }

// Get a single blog by ID
const getBlogOne = (req, res) => {
    Blog.findById(req.params.id)
        .then((blog) => {
            if (!blog) {
                return res.status(404).json({ error: "Blog not found" });
            }
            res.json({ blog });
        })
        .catch((error) => {
            res.status(500).json({ error: "Failed to fetch blog" });
        });
};

const createBlog = (req , res) => {
    // const image = req.file.filename;
    const {title , content , tags} = req.body;
    Blog.create({title , content , tags});

    res.json({
        message : "Blog created successfully",
    });
};



// Update a blog by ID
const updateBlog = (req, res) => {
    const { title, content, tags } = req.body;

    Blog.findByIdAndUpdate(req.params.id, { title, content, tags }, { new: true })
        .then((updatedBlog) => {
            if (!updatedBlog) {
                return res.status(404).json({ error: "Blog not found" });
            }
            res.json({ message: "Blog updated successfully", blog: updatedBlog });
        })
        .catch((error) => {
            res.status(500).json({ error: "Failed to update blog" });
        });
};

// Delete a blog by ID
const deleteBlog = (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then((deletedBlog) => {
            if (!deletedBlog) {
                return res.status(404).json({ error: "Blog not found" });
            }
            res.json({ message: "Blog deleted successfully" });
        })
        .catch((error) => {
            res.status(500).json({ error: "Failed to delete blog" });
        });
};


module.exports = { getBlog, getBlogOne, createBlog, updateBlog, deleteBlog };

























