const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {

    // who are login
    const followerUserName = req.user.username
    // who are we going to follow
    const followingUserName = req.params.username

    // you can not follow yourself
    if (followerUserName == followingUserName) {
        return res.status(400).json({
            message: "You can not follow yourself"
        })
    }

    // is followee exits    
    const isFolloweeExits = await userModel.findOne({
        username: followingUserName
    })

    if (!isFolloweeExits) {
        return res.status(404).json({
            message: `${followingUserName} is not exits`
        })
    }

    // check if already following
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUserName,
        following: followingUserName
    })

    if (isAlreadyFollowing) {
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

    if (!isUserFollowing) {
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

// accept follow request
async function acceptRequestController(req, res) {
    const followerUserName = req.params.username; // The person who sent the request
    const followingUserName = req.user.username;  // YOU (the person accepting it)

    const followRecord = await followModel.findOneAndUpdate(
        { follower: followerUserName, following: followingUserName, status: "pending" },
        { status: "accepted" },
        { new: true }
    );

    // check if request is not found
    if (!followRecord) return res.status(404).json({ message: "Request not found" });


    // added check for you can not accept your own request
    if (followRecord.follower === followRecord.following) {
        return res.status(400).json({
            message: "You can not accept your own request"
        })
    }

    // added check for you can not accept request if already accepted
    if (followRecord.status === "accepted") {
        return res.status(400).json({
            message: "You have already accepted this request"
        })
    }

    res.status(200).json({ message: "Request accepted", followRecord });
}


// reject follow request
async function rejectRequestController(req, res) {
    const followerUserName = req.params.username;
    const followingUserName = req.user.username;

    // Rejecting usually just deletes the pending request
    const followRecord = await followModel.findOneAndDelete({
        follower: followerUserName,
        following: followingUserName,
        status: ["pending", "accepted"]
    });

    if (!followRecord) return res.status(404).json({ message: "Request not found" });

    res.status(200).json({ message: "Request rejected" });
}



module.exports = {
    followUserController,
    unfollowUserController,
    acceptRequestController,
    rejectRequestController
}