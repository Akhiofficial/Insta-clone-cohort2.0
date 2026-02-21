require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");

// routes imports 
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route")
const userRouter = require("./routes/user.route")

// app imports 
const app = express();
app.use(express.json());
app.use(cookieParser());


// using routes 
// POST /api/auth/
app.use("/api/auth", authRouter);
// api for posts  
app.use("/api/posts", postRouter)
// api for users
app.use("/api/users", userRouter)

module.exports = app;
