const express = require("express");
const cors = require("cors");
const userRoutes = require("./srs/routes/users");
const mongoose = require("mongoose");

const app = express();

const PORT = 8000;

app.use(cors());

app.use(express.json());

app.use("/user", userRoutes);

app.listen(PORT, () => {
  mongoose.connect("mongodb://localhost:27017/crud");
  console.log(`server is running on http://localhost:${PORT}`);
});
