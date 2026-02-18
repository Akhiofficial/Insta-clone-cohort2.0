const express = require("express");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();


// register API
authRouter.post("/register", async (req, res) => {
  const { name, email, username, password, bio, profileImage } = req.body;


  // we use $or for if user exits with username or email it must return in the callback
  const isUserExits = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExits) {
    return res.status(409).json({
      message:
        "User already exits " +
        (isUserExits.email == email
          ? "Email already exits"
          : "Username already exits"),
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    profileImage,
    password: hash,
    bio,
    name
  });

  //   it must contain user data and it must be unique
  //   token is created by server using users data to authenticate
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  console.log(name);
  
  res.status(201).json({
    message: "User Registered Sucessfully",
    user: {
        email: user.email,
        username: user.username,
        name: user.name,
        bio: user.bio,
        profileImage: user.profileImage 
    }

  })
});

// login
authRouter.post("/login", async (req,res) => {
    
})

module.exports = authRouter
