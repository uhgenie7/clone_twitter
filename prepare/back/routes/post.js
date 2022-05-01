const express = require("express");
const { Post, Image, Comment, User, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");
const multer = require("multer");
const path = require("path");
// node가 path module 제공
const router = express.Router();
const fs = require("fs");

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  // 어디에 저장할 것이니?
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      // dfd.png
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // dfd
      done(null, basename + "_" + new Date().getTime() + ext); // dfd1213.png
    },
  }),
  limits: { fieldSize: 20 * 1024 * 1024 }, // 20MB 이미지 제한
});

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  // POST /post
  try {
    const hashtags = req.body.content.match(/#[^\s#]+/g);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } })
        )
      );
      // [[#노드, true], [#리액트 true]]
      await post.addHashtags(result.map((v) => v[0]));
    }

    // content에 이미지가 있는 경우 이미지 추가해서 응답
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        // 이미지가 다수이면 배열 [a.png, b.png]
        const images = await Promise.all(
          req.body.image.map((image) => {
            Image.create({ src: image });
          }) //db엔 주소만 갖고 있음
        );

        await post.addImages(images);
      } else {
        // 이미지가 하나면 image: c.png
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ["id", "nickname"],
        },
        {
          model: User, // 좋아요 누른사람
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// image router
router.post("/images", isLoggedIn, upload.array("image"), (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    // 실제로 게시물이 존재하는가?
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });

    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  // PATCH /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    // 시퀄라이즈가 add~ 메서드를 제공
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  // DELETE /post/1/like
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다.");
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
