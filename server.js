const http = require("node:http");

const { preHandleRequest, postHandleRequest } = require("./middleware/_index");
const { handleRequest } = require("./routes/_index");
const { getPort } = require("./utils/_index");

const port = 2000 || process.env.PORT || getPort();

const server = http.createServer(async (req, res) => {
  try {
    await preHandleRequest(req, res);
    handleRequest(req, res);
    postHandleRequest(req, res);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
  }
});

server.listen(port, () => {
  console.info(`\nMock server listening to port ${port} ⚡\n`);
});

module.exports = server;
