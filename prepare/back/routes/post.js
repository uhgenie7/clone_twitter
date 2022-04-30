const express = require("express");
const { Post } = require("../models");

const router = express.Router();

router.post("/", async (req, res, next) => {
  // POST /post
  // res.json([{ id: 1, content: "hello" }]);
  try {
    const post = await Post.create({
      content: req.body.content,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/", (req, res) => {
  // DELETE /post
  res.json([{ id: 1 }]);
});

module.exports = router;
