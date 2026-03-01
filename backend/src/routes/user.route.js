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

/**
 * @route POST /api/users/accept/:username
 * @Description accept a follow request
 * @access private 
 */
userRouter.post('/accept/:username', identifyUser, userController.acceptRequestController)



/**
 * @route GET /api/users/followers/:username
 * @Description get followers list
 * @access private
 */
userRouter.get("/followers/:username", identifyUser, userController.getFollowersController)

/**
 * @route GET /api/users/following/:username
 * @Description get following list
 * @access private
 */
userRouter.get("/following/:username", identifyUser, userController.getFollowingController)

/**
 * @route GET /api/users/requests
 * @Description get pending follow requests
 * @access private
 */
userRouter.get("/requests", identifyUser, userController.getPendingRequestsController)

/**
 * @route POST /api/users/reject/:username
 * @Description reject a follow request
 * @access private 
 */
userRouter.post('/reject/:username', identifyUser, userController.rejectRequestController)

/**
 * @route GET /api/users/all
 * @Description get all users except the currently logged in user
 * @access private
 */
userRouter.get("/all", identifyUser, userController.getAllUsersController)

module.exports = userRouter
