const express = require("express");
const router = express.Router();

const Auth = require("./auth");

router.use("/auth", Auth);
router.get("/ping", async (req, res) => {
  res.status(200).send("pong");
});

module.exports = router;
