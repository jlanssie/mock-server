import Router from "./router.class.js";
import { matchRoute } from "../utils/_index.js";

export const handleRequest = (req, res) => {
  const router = new Router().initRoutes();

  for (const route of router.getRoutes()) {
    const match = matchRoute(route, req);
    if (match) {
      return route.handler(req, res);
    }
  }

  // Default response

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Default response" }));
};
