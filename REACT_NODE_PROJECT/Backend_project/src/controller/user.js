const { User } = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const sendOTP = require("../config/emailConfig.js");
require("dotenv").config(); // Load environment variables

const saltRounds = 8;
const otpStore = new Map(); // Improved OTP storage

const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const singleUser = await User.findById(user_id);
    if (!singleUser) return res.status(404).json({ msg: "User not found" });
    res.status(200).json({ user: singleUser });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

const registerUser = async (req, res) => {
  // try {
  //   const { name, password, email } = req.body;
  //   console.log(req.body);
  //   // Check if email already exists
  //   // const existingUser = await User.findOne({ email });
  //   const existingUser = await User.findOne({
  //     $or: [{ email }, { username: name }],
  //   });
  //   if (existingUser) {
  //     return res.status(400).json({ msg: "Email already registered" });
  //   }

  //   // Hash password securely
  //   const hashPassword = bcrypt.hashSync(
  //     password,
  //     bcrypt.genSaltSync(saltRounds)
  //   );

  //   console.log("dsfgdfsfgbfdsf");
  //   // Create new user
  //   await User.create({
  //     username: name,
  //     password: hashPassword,
  //     email: email,
  //   });
  //   // await newUser.save();

  //   res.status(201).json({ msg: "User registered successfully" });
  // } catch (error) {
  //   res
  //     .status(500)
  //     .json({ msg: "Internal server error", error: error.message });
  // }

  try {
    console.log("Request Body:", req.body); // Debugging log

    const { name, password, email } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username: name }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "Email or username already registered" });
    }

    // Hash password securely
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));

    // Create new user
    const newUser = new User({
      username: name, // Ensure `username` is used correctly
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  // try {
  //   console.log("Login Request Body:", req.body);

  //   const { username, password } = req.body;

  //   if (!username || !password) {
  //     return res
  //       .status(400)
  //       .json({ msg: "Please enter username and password" });
  //   }

  //   const user = await User.findOne({ username });

  //   if (!user) {
  //     return res.status(404).json({ msg: "User not found" });
  //   }

  //   if (!bcrypt.compareSync(password, user.password)) {
  //     return res.status(400).json({ msg: "Incorrect password" });
  //   }

  //   const token = jwt.sign(
  //     { userId: user._id, username: user.username },
  //     process.env.JWT_SECRET, // Ensure JWT_SECRET is set in .env
  //     { expiresIn: "10m" }
  //   );

  //   res.status(200).json({ token, msg: "User logged in successfully" });
  // } catch (error) {
  //   console.error("Login Error:", error);
  //   res
  //     .status(500)
  //     .json({ msg: "Internal server error", error: error.message });
  // }
  
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ msg: "Invalid username or password" });
    }

    // Store login timestamp
    user.loginHistory.push(new Date());
    await user.save(); // Save login data to MongoDB

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );
    res.status(200).json({ token, msg: "User logged in successfully", user });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

const genOTP = async (req, res) => {
  try {
    const { email } = req.body;
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 }); // Expire in 5 mins

    const subject = "OTP Verification";
    const msg = `<h1>Your OTP: ${otp}</h1>`;
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "images",
      "Lion.jpg"
    );

    await sendOTP(email, subject, msg, filePath);

    res.json({ msg: "OTP sent" });
  } catch (error) {
    res.status(500).json({ msg: "Failed to send OTP", error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { otp, email, password } = req.body;

    const storedOTP = otpStore.get(email);
    if (!storedOTP || storedOTP.otp !== otp || Date.now() > storedOTP.expires) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
    await user.save();

    otpStore.delete(email); // Remove OTP after use

    res.json({ msg: "Password updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    const userData = req.user["data"];

    if (old_password === new_password) {
      return res
        .status(400)
        .json({ msg: "New password cannot be the same as the old password" });
    }

    const user = await User.findById(userData);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!bcrypt.compareSync(old_password, user.password)) {
      return res.status(400).json({ msg: "Incorrect old password" });
    }

    user.password = bcrypt.hashSync(
      new_password,
      bcrypt.genSaltSync(saltRounds)
    );
    await user.save();

    res.json({ msg: "Password updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

module.exports = {
  getUser,
  getUsers,
  registerUser,
  loginUser,
  genOTP,
  resetPassword,
  forgotPassword,
};
