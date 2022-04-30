const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const app = express();
const passportConfig = require("./passport");

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();

app.use(
  cors({
    origin: true,
    Credential: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session, cookie
app.use(cookieParser());
app.use(session());
app.use(passport.initialize());
app.use(passport.seesion());

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
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행 중");
});
