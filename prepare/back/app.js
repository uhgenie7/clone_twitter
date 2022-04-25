const http = require("http");
http.createServer((req, res) => {
  console.log(res.url, req.method);
  res.end("hello node");
});
http.listion(3065);
