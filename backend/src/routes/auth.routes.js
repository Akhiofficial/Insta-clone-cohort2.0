const express = require("express");
const authController = require('../controllers/auth.controller')

const authRouter = express.Router();

// register API
authRouter.post("/register", authController.registerController);


// login
authRouter.post("/login", authController.loginController);




module.exports = authRouter;
