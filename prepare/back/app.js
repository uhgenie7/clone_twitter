const express = require("express");

const app = express();

// app.method('url', (req, res)=>{callback})
app.get("/", (req, res) => {
  // end (x) send (o)
  res.send("hello express");
});

app.get("/api", (req, res) => {
  res.send("hello api");
});

app.listen(3065, () => {
  console.log("서버 실행 중");
});
