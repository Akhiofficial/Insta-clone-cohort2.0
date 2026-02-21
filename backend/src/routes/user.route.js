const express = require("express");
const userController = require("../controllers/user.controller");
const { identifyUser } = require("../middlewears/auth.middlewear");
const userRouter = express.Router();


/**
 * @route POST /api/users/follow/:username
 * @Description follow a user
 * @access private 
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController)

/**
 * @route POST /api/users/unfollow/:username
 * @Description unfollow a user
 * @access private 
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)






module.exports = userRouter
