const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,"username required" ],
    unique: [true,"Username Already exits"],
    trim: true,
  },
  name:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true,"Email is required"],
    unique: [true,"Email is already exists"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true,'password is required' ],
    select: false
  },
  bio: {
    type: String,
    default: "",
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },  
  ],  
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/akhi/profile.jpg?updatedAt=1771434115058",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const userModel = mongoose.model("users", userSchema)

module.exports = userModel