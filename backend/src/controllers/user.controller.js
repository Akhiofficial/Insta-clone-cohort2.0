const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {

    // who are login
    const followerUserName = req.user.username
    // who are we going to follow
    const followingUserName = req.params.username

    // you can not follow yourself
    if(followerUserName == followingUserName){
        return res.status(400).json({
            message: "You can not follow yourself"
        })
    }

    // is followee exits    
    const isFolloweeExits = await userModel.findOne({
        username: followingUserName
    })

    if(!isFolloweeExits){
        return res.status(404).json({
            message: `${followingUserName} is not exits`
        })
    }

    // check if already following
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUserName,
        following: followingUserName
    })

    if(isAlreadyFollowing){
        return res.status(409).json({
            message: `${followingUserName} is already followed by you`,
            follow: isAlreadyFollowing
        })
    }


    // maintain follow record
    const followRecord = await followModel.create({
        follower: followerUserName,
        following: followingUserName
    })

    res.status(201).json({
        message: `You are now following ${followingUserName}`,
        followRecord
    })

}


async function unfollowUserController(req, res) {

    const followerUserName = req.user.username
    const followingUserName = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUserName,
        following: followingUserName
    })

    if(!isUserFollowing){
        return res.status(400).json({
            message: `you are not following ${followingUserName}`
        })
    }

    // delete follow record
    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You are unfollowing ${followingUserName}`
    })
    

}



module.exports = {
    followUserController,
    unfollowUserController
}