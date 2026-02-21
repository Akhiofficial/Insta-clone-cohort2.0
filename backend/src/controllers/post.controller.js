const postModal = require("../models/post.model");
const { ImageKit, toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

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

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController
};
