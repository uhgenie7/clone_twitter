const http = require("http");
const server = http.createServer((req, res) => {
  console.log(res.url, req.method);
  res.write("<h1>hello node</h1>");
  res.write("hello node");
  res.write("hello node");
  res.write("hello node");
  res.end("hello node");
});

server.listen(3065, () => {
  console.log("서버 실행 중");
});
