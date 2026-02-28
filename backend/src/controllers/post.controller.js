const postModal = require("../models/post.model");
const { ImageKit, toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");
const userModel = require("../models/user.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {



  // uploading file to the imagkit io
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "postImage",
    folder: "Insta-clone/post",
  });

  // find post from user
  const post = await postModal.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  // post craeted
  res.status(201).json({
    message: "Post Created Sucessfully",
    post,
  });
}

async function getPostController(req, res) {

  const userId = req.user.id

  const post = await postModal.find({
    user: userId
  })

  res.status(200).json({
    message: "Post fetched sucessfully ",
    post
  })

}

async function getPostDetailsController(req, res) {

  const userId = req.user.id

  const postId = req.params.postId

  const post = await postModal.findById(postId)

  if (!post) {
    res.status(404).json({
      message: "Post not found with the id"
    })
  }

  const isValidUser = post.user.toString() === userId

  if (!isValidUser) {
    return res.status(403).json({
      message: "forbidden Content You don't have permission to access"
    })
  }

  res.status(200).json({
    message: "post fetched sucessfully",
    post
  })


}


async function likePostController(req, res) {

  const username = req.user.username
  const postId = req.params.postId

  const post = await postModal.findById(postId)

  if (!post) {
    return res.status(404).json({
      message: "Post not found with the id"
    })
  }

  // check if user already liked the post
  const isLiked = await likeModel.findOne({
    post: postId,
    user: username
  })

  if (isLiked) {
    return res.status(400).json({
      message: "You have already liked this post"
    })
  }


  const like = await likeModel.create({
    post: postId,
    user: username
  })

  res.status(201).json({
    message: "Post liked sucessfully",
    like
  })




}


async function unlikePostController(req, res) {

  const username = req.user.username
  const postId = req.params.postId


  const isLiked = await likeModel.findOne({
    post: postId,
    user: username
  })

  if (!isLiked) {
    return res.status(400).json({
      message: "Post not liked"
    })
  }

  await likeModel.findOneAndDelete({
    _id: isLiked._id
  })

  res.status(200).json({
    message: "Post unliked sucessfully"
  })

}



async function getFeedController(req, res) {

  const user = req.user

  const posts = await Promise.all((await postModal.find().populate("user").sort({ _id: -1 }).lean())
    .map(async (post) => {

      // typeof post => mongooseObject
      const isLiked = await likeModel.findOne({
        post: post._id,
        user: user.username
      })

      post.isLiked = !!isLiked

      const currentUser = await userModel.findById(user.id);
      const isSaved = currentUser.savedPosts.includes(post._id);

      post.isSaved = isSaved

      return post
    }))


  res.status(200).json({
    message: "Feed fetched sucessfully",
    posts
  })


}


async function savePostController(req, res) {
  const postId = req.params.postId; // <--- You need this back!

  const user = await userModel.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { savedPosts: postId } },
    { new: true }
  );

  res.status(200).json({ message: "Post saved", user });
}



async function unsavePostController(req, res) {

  const postId = req.params.postId

  const post = await postModal.findById(postId)

  if (!post) {
    return res.status(404).json({
      message: "Post not found with the id"
    })
  }

  // check if user already saved the post
  const isSaved = await userModel.findOne({
    _id: req.user.id,
    savedPosts: postId
  })

  if (!isSaved) {
    return res.status(400).json({
      message: "You have not saved this post"
    })
  }

  const unsave = await userModel.findByIdAndUpdate(
    req.user.id,
    { $pull: { savedPosts: postId } },
    { new: true }
  )

  res.status(201).json({
    message: "Post unsaved sucessfully",
    unsave
  })

}


module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  getFeedController,
  unlikePostController,
  savePostController,
  unsavePostController
};
