const express = require("express");
const router = express.Router();

const PostController = require("../controllers/post");
const postController = new PostController();

const authMiddleware = require("../middlewares/authMiddleware");
const wrapAsyncMiddleware = require("../middlewares/wrapAsyncMiddleware");

// [GET] /post?page=1&limit=10&offset=0
router.get("/", wrapAsyncMiddleware(postController.getPosts));

// [GET] /post/:id
router.get("/:id", wrapAsyncMiddleware(postController.getPost));

// [POST] /post
router.post("/", authMiddleware, wrapAsyncMiddleware(postController.createPost));

// [PUT] /post/:id
router.post("/:id", authMiddleware, wrapAsyncMiddleware(postController.updatePost));

// [DELETE] /post/:id
router.post("/:id", authMiddleware, wrapAsyncMiddleware(postController.deletePost));

module.exports = router;
