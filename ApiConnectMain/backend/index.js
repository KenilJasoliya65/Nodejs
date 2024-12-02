const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/' , (req , res) => {
    res.json({
        msg : 'welcome to red and white!!!'
    });
});

app.listen(8000);