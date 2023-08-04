const express = require("express");
const router = express.Router();

const PostController = require("../controllers/post");
const postController = new PostController();

const authMiddleware = require("../middlewares/authMiddleware");
const wrapAsyncMiddleware = require("../middlewares/wrapAsyncMiddleware");

// [GET] /post
router.get("/", wrapAsyncMiddleware(postController.getPosts));

// [GET] /post/:id
router.get("/:id", wrapAsyncMiddleware(postController.getPost));

// [POST] /post
router.post("/", authMiddleware, wrapAsyncMiddleware(postController.createPost));

// [PUT] /post
router.post("/", authMiddleware, wrapAsyncMiddleware(postController.updatePost));

// [DELETE] /post
router.post("/", authMiddleware, wrapAsyncMiddleware(postController.deletePost));

module.exports = router;
