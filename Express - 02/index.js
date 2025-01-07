const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;
app.set("view engine" ,"ejs")
app.set("views",path.join(__dirname,"src/views"));

app.get("/",(req,res)=>{
    res.render("index",{
        names:["Husain","Ashraf","Huzefa"],
    })
})

app.listen(PORT);