const dotenv = require ("dotenv")
const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./src/routes/user");
const path =require("path") 
const cookieParser = require("cookie-parser")
const session = require("cookie-session");
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
dotenv.config()

app.use(session({
    name : "session" ,
    keys : [process.env.SESSION_SECRET_KEY]
}))



app.use("/user" , userRoutes)

// app.get("/" , (req, res) => {
//     console.log(req.cookie); 
//     res.cookie("item" , ["tm" , "cid" , "ct" ] , {
//         maxAge : 60000 ,
//         httpOnly : true,
//     secure : true    })
//     res.json({ msg : "server is running"})
// })

// app.get("/seccion " , (req,res) => {
//     console.log(req.session);

//     console.log("previous Views : ", req.session.views);
//     req.session.views = (Request.session.views || 0) +1 
//     console.log("Updated views" , req.session.views);

//     res.send("session updated")    
// })

app.listen(PORT , () => {
    mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
    console.log("server started");
})