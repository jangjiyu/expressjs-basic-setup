const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/auth");
const authController = new AuthController();

const wrapAsyncMiddleware = require("../middlewares/wrapAsyncMiddleware");

// [POST] /auth/join
router.post("/join", wrapAsyncMiddleware(authController.join));

// [POST] /auth/login
router.post("/login", wrapAsyncMiddleware(authController.login));

module.exports = router;
