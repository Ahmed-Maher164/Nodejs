const express = require("express")
const mongoose = require('mongoose');
const app = express()
mongoose.connect("mongodb://localhost:27017/blogApp",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if (err ) console.log("falied to connect mongo")
    else
        console.log("connected successfully to mongo")
})
const userRouter = require("./routes/users")
const postRouter = require("./routes/posts")
const rateRouter = require("./routes/rates")
app.use(express.json())
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/rates", rateRouter)
app.listen(3012,(err)=>{
    if (err) console.log("error in connecting")
    else
        console.log("connected successfully on port 3000")
})
