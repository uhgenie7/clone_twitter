const http = require("http");
const server = http.createServer((req, res) => {
  console.log(res.url, req.method);

  if (req.method === "GET") {
    if (req.url === "/api/posts") {
      // 뭔가 잘못됐어.
    }
  } else if (req.method === "POST") {
    if (req.url === "/api/posts") {
      // 뭔가 잘못됐어.
    }
  } else if (req.method === "DELETE") {
    if (req.url === "/api/posts") {
      // 뭔가 잘못됐어.
    }
  }

  res.write("<h1>hello node</h1>");
  res.write("hello node");
  res.write("hello node");
  res.write("hello node");
  res.end("hello node");
});

server.listen(3065, () => {
  console.log("서버 실행 중");
});
