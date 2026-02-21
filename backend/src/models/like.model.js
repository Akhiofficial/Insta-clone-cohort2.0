const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "Post ID is required"]
    },
    user: {
        type: String,
        required: [true, "User name is required"]
    }   
}, {
    timestamps: true
})

// validation for users so user can only like another users only one time 
likeSchema.index({post: 1, user: 1}, {unique: true})


const likeModel = mongoose.model("likes", likeSchema)

module.exports = likeModel