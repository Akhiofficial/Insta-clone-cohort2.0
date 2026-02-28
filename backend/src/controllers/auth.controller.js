const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')



// register controllers
async function registerController (req, res) {
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

  // hash passowrd using bcrypt and hash 10 times 
  const hash = await bcrypt.hash(password, 10)

  const user = await userModel.create({
    username,
    email,
    profileImage,
    password: hash,
    bio,
    name,
  });

  //   it must contain user data and it must be unique
  //   token is created by server using users data to authenticate
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Registered Sucessfully",
    user: {
      email: user.email,
      username: user.username,
      name: user.name,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}


// login controller 
async  function loginController (req,res) {
  const { username, email, password } = req.body;

  // if user can login with username and pass or email with pass
  const user = await userModel.findOne({
    $or: [
      {
        email: email,
      },
      {
        username: username,
      },
    ],
  }).select("+password")

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }


  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "password invalid",
    });
  }

  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token)

  res.status(200).json({
    message: "User login Sucessfully",
    user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage
    }
  })

}


// get-me 
async function getMeController (req, res) {
  
  const userId = req.user.id

  const user = await userModel.findById(userId)

  res.status(200).json({
    message: "User data",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
      isSaved: user.savedPosts
    }
  })
}

module.exports = {registerController , loginController, getMeController}