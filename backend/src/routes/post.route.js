const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage()})

// POST /api/posts/ [protected] only authorized user with valid token
// req.body = {caption , img-file }

// /api/post/
postRouter.post("/", upload.single("image"), postController.createPostController);



module.exports = postRouter;