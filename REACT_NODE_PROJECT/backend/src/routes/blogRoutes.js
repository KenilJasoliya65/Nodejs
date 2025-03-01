// const express = require("express");
// const {
//   getBlogs,
//   getBlog,
//   createBlog,
//   updateBlog,
//   deleteBlog,
// } = require("../controllers/blogController");
// const upload = require("../middlewares/uploadFile");
// const authToken = require("../middlewares/authToken");
// const router = express.Router();

// router.get("/", authToken, getBlogs);
// router.get("/:blogId", getBlog);
// router.post("/", authToken, upload.single("image"), createBlog);
// router.put("/:blogId", authToken, upload.single("image"), updateBlog);
// router.delete("/:blogId", authToken, deleteBlog);

// module.exports = router;

const express = require("express")
const blog = require("../controllers/blogController")
const upload = require("../middlewares/uploadFile")
const authToken = require("../middlewares/authToken")

const routes = new express.Router() 

routes.get("/" , blog.getAll)
routes.post("/" , authToken , upload.single("image"), blog.create)
routes.get("/:blogId" , blog.getOne)

module.exports = routes