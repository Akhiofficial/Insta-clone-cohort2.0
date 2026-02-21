const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage()})

// POST /api/posts/ [protected] only authorized user with valid token
// req.body = {caption , img-file }

// /api/post/
postRouter.post("/", upload.single("image"), postController.createPostController);


// GET /api/post
postRouter.get("/", postController.getPostController)

/**
 * GET /api/posts/deatils/:postid 
 * - return an detail about specific posts with the id. also checkwhether 
 * the post is belong to the user that the requesting from  
**/

postRouter.get("/details/:postId", postController.getPostDetailsController)


module.exports = postRouter;