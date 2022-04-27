const express = require("express");

const app = express();
const postRouter = require("./routes/post");

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

app.listen(3065, () => {
  console.log("서버 실행 중");
});
