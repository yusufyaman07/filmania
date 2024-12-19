const http = require("http");
const getRequest = require("./methods/get.js");
const postRequest = require("./methods/post.js");
const deleteRequest = require("./methods/delete.js");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  switch (req.method) {
    case "GET":
      getRequest(req, res);
      break;
    case "POST":
      postRequest(req, res);
      break;
    case "DELETE":
      deleteRequest(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ message: "İstek atılan url tanımsız" }));
      res.end();
  }
});

const port = 4000;
server.listen(port, () => {
  console.log(`Server ${port}'a gelen istekleri dinlemekte`);
});
