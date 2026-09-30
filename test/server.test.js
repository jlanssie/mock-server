const { test, describe, before, after } = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const { Readable } = require("node:stream");
const { preHook } = require("../middleware/_index");
const BodyParser = require("../middleware/bodyParser.class");
const Logger = require("../middleware/logger.class");
const { handleRequest, matchPath, Router } = require("../routes/_index");
const mockData = require("../mock/data.json");

describe("Mock Server (Vanilla Node.js)", () => {
  let server;
  let baseUrl;

  before(async () => {
    const handler = async (req, res) => {
      try {
        await preHook(req, res);
        handleRequest(req, res);
      } catch (err) {
        if (!res.headersSent) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: err.message }));
        }
      }
    };

    server = http.createServer(handler);
    await new Promise((resolve) => {
      server.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  describe("Route matcher", () => {
    test("matches exact routes", () => {
      const result = matchPath("/data", "/data");
      assert.strictEqual(result.matches, true);
    });

    test("matches parameterized routes", () => {
      const result = matchPath("/data/:id", "/data/42");
      assert.strictEqual(result.matches, true);
      assert.deepStrictEqual(result.params, { id: "42" });
    });

    test("does not match different paths", () => {
      const result = matchPath("/data/:id", "/users/42");
      assert.strictEqual(result.matches, false);
    });
  });

  describe("HTTP Endpoints", () => {
    test("GET /data/:id returns mock data", async () => {
      const res = await fetch(`${baseUrl}/data/123`);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers.get("content-type"), "application/json");
      const data = await res.json();
      assert.deepStrictEqual(data, mockData);
    });

    test("POST /data/:id accepts JSON payload and responds with {}", async () => {
      const res = await fetch(`${baseUrl}/data/123`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "test-item" }),
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.deepStrictEqual(data, {});
    });

    test("PUT /data/:id accepts payload and responds with {}", async () => {
      const res = await fetch(`${baseUrl}/data/123`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updated: true }),
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.deepStrictEqual(data, {});
    });

    test("DELETE /data/:id responds with {}", async () => {
      const res = await fetch(`${baseUrl}/data/123`, {
        method: "DELETE",
      });
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.deepStrictEqual(data, {});
    });

    test("Unknown route falls back to default route", async () => {
      const res = await fetch(`${baseUrl}/unregistered/route`);
      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.deepStrictEqual(data, { message: "Default reponse" });
    });
  });

  describe("Middlewares", () => {
    test("BodyParser handles empty body", async () => {
      const parser = new BodyParser();
      const req = Readable.from([]);
      req.headers = {};
      await parser.handleRequest(req);
      assert.deepStrictEqual(req.body, {});
    });

    test("BodyParser parses json payload", async () => {
      const parser = new BodyParser();
      const req = Readable.from([Buffer.from(JSON.stringify({ title: "test", count: 5 }))]);
      req.headers = { "content-type": "application/json" };
      await parser.handleRequest(req);
      assert.deepStrictEqual(req.body, { title: "test", count: 5 });
    });

    test("Logger handles request", () => {
      const logger = new Logger();
      logger.handleRequest({ method: "GET", url: "/test", body: {} }, {});
    });
  });
});
