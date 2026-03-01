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

    // Sync userModel arrays
    const followerUser = await userModel.findOne({ username: followerUserName });
    const followingUser = await userModel.findOne({ username: followingUserName });

    if (followerUser && followingUser) {
        await userModel.findByIdAndUpdate(followingUser._id, { $pull: { followers: followerUser._id } });
        await userModel.findByIdAndUpdate(followerUser._id, { $pull: { following: followingUser._id } });
    }

    res.status(200).json({
        message: `You are unfollowing ${followingUserName}`
    })


}

// accept follow request
async function acceptRequestController(req, res) {
    const followerUserName = req.params.username; // The person who sent the request
    const followingUserName = req.user.username;  // YOU (the person accepting it)

    let followRecord = await followModel.findOne({
        follower: followerUserName,
        following: followingUserName
    });

    // check if request is not found
    if (!followRecord) return res.status(404).json({ message: "Request not found" });

    // added check for you can not accept request if already accepted
    if (followRecord.status === "accepted") {
        return res.status(400).json({
            message: "You have already accepted this request"
        })
    }

    // updated status
    followRecord.status = "accepted";
    await followRecord.save();

    // added check for you can not accept your own request
    if (followRecord.follower === followRecord.following) {
        return res.status(400).json({
            message: "You can not accept your own request"
        })
    }

    // Sync userModel arrays
    const followerUser = await userModel.findOne({ username: followerUserName });
    const followingUser = await userModel.findOne({ username: followingUserName });

    if (followerUser && followingUser) {
        await userModel.findByIdAndUpdate(followingUser._id, { $addToSet: { followers: followerUser._id } });
        await userModel.findByIdAndUpdate(followerUser._id, { $addToSet: { following: followingUser._id } });
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

    // If it was already accepted, sync userModel arrays (pull)
    if (followRecord.status === "accepted") {
        const followerUser = await userModel.findOne({ username: followerUserName });
        const followingUser = await userModel.findOne({ username: followingUserName });

        if (followerUser && followingUser) {
            await userModel.findByIdAndUpdate(followingUser._id, { $pull: { followers: followerUser._id } });
            await userModel.findByIdAndUpdate(followerUser._id, { $pull: { following: followingUser._id } });
        }
    }

    res.status(200).json({ message: "Request rejected" });
}

// get followers list
async function getFollowersController(req, res) {
    const { username } = req.params;
    const loggedInUser = req.user.username;

    const followers = await followModel.find({
        following: username,
        status: "accepted"
    });

    const followerDetails = await Promise.all(
        followers.map(async (f) => {
            const user = await userModel.findOne({ username: f.follower }).select("username name profileImage bio");
            if (!user) return null;

            // Check if logged in user is already following this follower
            const isFollowing = await followModel.findOne({
                follower: loggedInUser,
                following: user.username
            });

            return {
                ...user.toObject(),
                isFollowing: !!isFollowing,
                followStatus: isFollowing ? isFollowing.status : null
            };
        })
    );

    res.status(200).json({
        followers: followerDetails.filter(user => user !== null),
        count: followers.length
    });
}

// get following list
async function getFollowingController(req, res) {
    const { username } = req.params;

    const following = await followModel.find({
        follower: username,
        status: "accepted"
    });

    const followingDetails = await Promise.all(
        following.map(async (f) => {
            return await userModel.findOne({ username: f.following }).select("username name profileImage bio");
        })
    );

    res.status(200).json({
        following: followingDetails.filter(user => user !== null),
        count: following.length
    });
}

// get pending requests
async function getPendingRequestsController(req, res) {
    const username = req.user.username;

    const requests = await followModel.find({
        following: username,
        status: "pending"
    });

    const requestDetails = await Promise.all(
        requests.map(async (r) => {
            return await userModel.findOne({ username: r.follower }).select("username name profileImage bio");
        })
    );

    res.status(200).json({
        requests: requestDetails.filter(user => user !== null),
        count: requests.length
    });
}

// get all users except the currently logged in user
async function getAllUsersController(req, res) {
    const userId = req.user.id;
    const loggedInUser = req.user.username;

    // fetch all users except the current user
    const users = await userModel.find({ _id: { $ne: userId } })
        .select("username name profileImage bio");

    const userWithFollowStatus = await Promise.all(
        users.map(async (u) => {
            const isFollowing = await followModel.findOne({
                follower: loggedInUser,
                following: u.username
            });

            return {
                ...u.toObject(),
                isFollowing: !!isFollowing,
                followStatus: isFollowing ? isFollowing.status : null
            };
        })
    );

    res.status(200).json({
        users: userWithFollowStatus,
        count: users.length
    });
}

module.exports = {
    followUserController,
    unfollowUserController,
    acceptRequestController,
    rejectRequestController,
    getFollowersController,
    getFollowingController,
    getPendingRequestsController,
    getAllUsersController
}