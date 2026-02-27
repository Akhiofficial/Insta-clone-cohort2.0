const express = require("express");
const authController = require('../controllers/auth.controller')
const { identifyUser } = require("../middlewears/auth.middlewear");

const authRouter = express.Router();

// register API
authRouter.post("/register", authController.registerController);


// login
authRouter.post("/login", authController.loginController);

/**
 * @routes GET /api/auth/get-me
 * @description get current logged in user
 * @access private
 */
authRouter.get("/get-me", identifyUser, authController.getMeController);



module.exports = authRouter;
