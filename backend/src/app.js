require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors")


// routes imports 
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route")
const userRouter = require("./routes/user.route")

// app imports 
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    } 
))


// using routes 
// POST /api/auth/
app.use("/api/auth", authRouter);
// api for posts  
app.use("/api/posts", postRouter)
// api for users
app.use("/api/users", userRouter)

module.exports = app;
