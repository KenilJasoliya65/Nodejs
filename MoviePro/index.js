const express = require("express");
const cors = require("cors");
const movieRoute = require("./src/routes/movie");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/movie", movieRoute);

app.listen(PORT, async () => {
  await mongoose.connect("mongodb+srv://KenilJasoliya:Kenil123@mongolearn.ucvb6.mongodb.net/");
  console.log("DB connected");
  console.log(`server is running on http://localhost:${PORT}`);
});
