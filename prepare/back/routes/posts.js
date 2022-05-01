const express = require("express");
const router = express.Router();
const { Post } = require("../models");

router.get("/", async (req, res, next) => {
  //get /posts 여러개 가져옴
  try {
    const posts = await Post.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
