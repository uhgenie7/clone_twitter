const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
const passport = require("passport");

router.post("/login", (req, res, next) => {
  passport.authenticate("lcoal", (err, user, info) => {
    if (err) {
      // 서버에러
      console.error(err);
      return next(err);
    }

    if (info) {
      //클라이언트 에러
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        //passport error
        console.error(loginErr);
        return next(loginErr);
      }

      return res.json(user);
    });
  })(req, res, next);
});

router.post("/", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      // 조건은 where
      where: {
        email: req.body.email,
      },
    });

    if (exUser) {
      // return을 안 붙이면 send 응답을 두 번 보내게 되는 셈
      return res.status(403).send("이미 사용 중인 아이디입니다");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    // POST /user
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
});

module.exports = router;
