const express = require("express");
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");
const upload = require("../middlewares/uploadFile"); 
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getMovies);
router.get("/:movieId", getMovie);
router.post("/", authMiddleware, upload.single("image"), createMovie);
router.put("/:movieId", authMiddleware, upload.single("image"), updateMovie);
router.delete("/:movieId", authMiddleware, deleteMovie);

module.exports = router;
