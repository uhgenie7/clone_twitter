const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const db = require("./models");
const app = express();
const passportConfig = require("./passport");

dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session, cookie
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.method('url', (req, res)=>{callback})
app.get("/", (req, res) => {
  // end (x) send (o)
  res.send("hello express");
});

app.get("/api", (req, res) => {
  // 문자열 응답
  res.send("hello api");
});

app.get("/api/post", (req, res) => {
  res.json([
    { id: 1, content: "hello" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
});

// pre fix 됨
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);

// app.user((err, req, res, next) => {
//   // 직접 에러 처리 미들 웨어를 처리
// });

app.listen(3065, () => {
  console.log("서버 실행 중");
});
