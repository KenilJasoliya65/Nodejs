const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');
const blogRoutes = require('./src/routes/blog');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

app.use('/blog' , blogRoutes);


app.listen(PORT , async () => {
    await mongoose.connect(
      "mongodb+srv://KenilJasoliya:Kenil123@mongolearn.ucvb6.mongodb.net/Blog"
    );
    console.log(`Server is running on port ${PORT}`);
})