const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage()})
// auth middlewear to identify user who are requesting
const { identifyUser } = require("../middlewears/auth.middlewear");

/** 
 *@routes  POST /api/posts/ [protected] only authorized user with valid token
 *@description  req.body = {caption , img-file }
 * /api/post/
 * */
postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController);


/** 
 *@routes GET /api/post
 *@description - get all the post created by the user who are login
 * */
postRouter.get("/", identifyUser, postController.getPostController)

/**
 *@routes GET /api/posts/deatils/:postid 
 *@description - return an detail about specific posts with the id. also checkwhether 
 * the post is belong to the user that the requesting from  
**/
postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)


/**
 *@routes POST /api/posts/like/:postid
 *@description - like a post
*@access private 
*/
postRouter.post("/like/:postId", identifyUser, postController.likePostController)


module.exports = postRouter;