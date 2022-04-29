const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.post("/", async (req, res) => {
  // POST /user
  await User.create({
    email: req.body.email,
    nickname: req.body.nickname,
    password: req.body.password,
  });
  res.send("ok");
});

module.exports = router;
