// const blog = require("../models/Blog");
// const fs = require("fs");
// const path = require("path");

// const getBlogs = async (req, res) => {
//   const allBlogs = await Blog.find();

//   res.json({
//     blogs: allBlogs,
//   });
// };

// const getBlog = async (req, res) => {
//   try {
//     const blog_id = req.params["blog_id"];
//     const blog = await blog.find({ _id: blog_id });

//     if (!blog) {
//       return res.status(404).json({
//         msg: "This  blog doesn't exist",
//       });
//     } else {
//       return res.status(200).json({
//         blog: blog,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: "Internal server error",
//       error: error,
//     });
//   }
// };

// const createBlog = (req, res) => {
//   const { title, content, tags } = req.body;
//   let image = "";
//   if (req.file && req.file.filename) {
//     image = req.file.filename;
//   }
//   const user = req.user.data;
//   blog.create({
//     title,
//     content,
//     tags,
//     image,
//     user,
//   });
//   res.json({
//     msg: "Blog created",
//   });
// };

// const updateBlog = async (req, res) => {
//   try {
//     const blog_id = req.params["blog_id"];
//     const blog_data = req.body;
//     const blog = await blog.findOne({ _id: blog_id });

//     if (!blog) {
//       return res.json({
//         msg: "This Blog doesn't exist",
//       });
//     } else {
//       if (blog_data["title"]) {
//         blog["title"] = blog_data["title"];
//       }
//       if (blog_data["content"]) {
//         blog["content"] = blog_data["content"];
//       }
//       if (req.file && req.file.filename) {
//         const oldFileName = blog["image"];

//         if (oldFileName !== "") {
//           const oldFilePath = path.join(
//             __dirname,
//             "..",
//             "..",
//             "public",
//             "images",
//             oldFileName
//           );
//           fs.unlinkSync(oldFilePath);
//         }
//         blog["image"] = req.file.filename;
//       }
//       if (blog_data["tags"]) {
//         const index = blog.tags.indexOf(blog_data.tags.old);
//         blog.tags.set(index, blog_data.tags.new);
//       }
//       blog.save();

//       return res.status(202).json({
//         msg: "blog updated",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: "Internal server error",
//       error: error,
//     });
//   }
// };

// const deleteBlog = async (req, res) => {
//   try {
//     const blog_id = req.params["blog_id"];
//     const blog = await blog.findById(blog_id);

//     if (!blog) {
//       return res.json({
//         msg: "This user doesn't exist",
//       });
//     } else {
//       const fileName = blog["image"];

//       if (fileName !== "") {
//         const filePath = path.join(
//           __dirname,
//           "..",
//           "..",
//           "public",
//           "images",
//           fileName
//         );
//         fs.unlinkSync(filePath);
//       }

//       await blog.deleteOne({ _id: blog_id });

//       return res.status(202).json({
//         msg: "blog removed",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: "Internal server error",
//       error: error,
//     });
//   }
// };

// const addBlogTag = (req, res) => {
//   res.json({
//     msg: "tag updated",
//   });
// };

// const removeBlogTage = (req, res) => {
//   res.json({
//     msg: "tag removed",
//   });
// };

// module.exports = {
//   getBlogs,
//   getBlog,
//   createBlog,
//   deleteBlog,
//   updateBlog,
// };



const { get } = require("mongoose")
const Blog = require("../models/Blog")

const getOne = (req , res ) => { }

const getAll = async (req , res) => {
  let pageNo = Number(req.query["page"]) ||1
  let limitItems = Number(req.query["limit"]) || 5

  let skipItems =  (pageNo - 1) * limitItems

  let total = await Blog.countDocuments()
  let totalPages = Math.ceil(total / limitItems)
  const blog = await Blog.find()
  .skip(skipItems)
  .limit(limitItems)
  .populate("user" , "username")
  res.json({
    data : blog ,
    total : total ,
    totalPages : totalPages
  })
}

const create = async (req ,res) =>{
  const {title , content} = req.body

  const user_id = req.user.data

  let image = ""

  if (req.file && req.file.filename) {
    image = req.file.filename
  }
   
  if (!title) return res.json({ msg : "Title is required"})

  await Blog.create({ title, content , image, user : user_id})

  res.json({
    msg : "blog created"
  
  })
}

module.exports = {getOne , getAll , create}