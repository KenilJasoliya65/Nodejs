// const express = require("express");
// const {
//   getUser,
//   getUsers,
//   registerUSer,
//   updateUser,
//   deleteUser,
//   loginUser,
// } = require("../controllers/user");
// const userRoutes = express.Router();

// userRoutes.get("/", getUsers);

// userRoutes.get("/:user_id", getUser);

// userRoutes.post("/", registerUSer);

// userRoutes.put("/:user_id", updateUser);

// userRoutes.delete("/:user_id", deleteUser);

// userRoutes.post("/login", loginUser);

// module.exports = userRoutes;

const express = require("express");
const {
  getUser,
  getUsers,
  registerUser,
  loginUser,
  genOTP,
  resetPassword,
  forgotPassword,
} = require("../controller/user");

const authToken = require("../middlewares/authToken");

const userRoutes = express.Router();

userRoutes.get("/getuser", getUsers);

userRoutes.get("/:user_id", getUser);

userRoutes.post("/register", registerUser);

userRoutes.post("/login", loginUser);

userRoutes.post("/otp", genOTP);

userRoutes.post("/forgot_password", forgotPassword);

userRoutes.post("/reset_password", authToken, resetPassword);

module.exports =  userRoutes 
