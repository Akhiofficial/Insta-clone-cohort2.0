require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// routes imports 
const authRouter = require("./routes/auth.route");
const postRouter = require("./routes/post.route")
const userRouter = require("./routes/user.route")

// app imports 
const app = express();
app.use(express.static("./public"));
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

if (process.env.NODE_ENV === "production") {
    const frontendDistPath = path.join(__dirname, "../../frontend/insta-clone/dist");
    app.use(express.static(frontendDistPath));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(frontendDistPath, "index.html"));
    });
}

module.exports = app;
