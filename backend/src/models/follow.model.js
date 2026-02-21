const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({

    follower: {
        type: String,
        required: [true, "Follower is required"]
    },
    following: {
        type: String,
        required: [true, "Following is required"]
    },
}, {
    timestamps: true
})


// validation for users so user can only follow another users only one time 
followSchema.index({follower: 1, following: 1}, {unique: true})


const followModel = mongoose.model("follows", followSchema)

module.exports = followModel


