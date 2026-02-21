require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route")

const app = express();

app.use(express.json());
app.use(cookieParser());

// api
// POST /api/auth/
app.use("/api/auth", authRouter);

// api for posts  
app.use("/api/posts", postRouter)


module.exports = app;
