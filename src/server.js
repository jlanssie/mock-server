import http from "node:http";
import { preHook, postHook } from "./middleware/_index.js";
import { handleRequest } from "./routes/_index.js";
import { getPort } from "./utils/_index.js";

const port = 2000 || process.env.PORT || getPort();

const server = http.createServer(async (req, res) => {
  try {
    await preHook(req, res);
    handleRequest(req, res);
    postHook(req, res);
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
