import Router from "./router.class.js";
import { matchRoute } from "../utils/_index.js";
import routesConfig from "../config/routes.json" with { type: "json" };
import mockData from "../mock/data.json" with { type: "json" };

const methodConfigs = [
  { method: "GET", urls: routesConfig.GET_URLS, response: mockData },
  { method: "POST", urls: routesConfig.POST_URLS, response: {} },
  { method: "PUT", urls: routesConfig.PUT_URLS, response: {} },
  { method: "DELETE", urls: routesConfig.DELETE_URLS, response: {} },
];

export const handleRequest = (req, res) => {
  const router = new Router().initRoutes(methodConfigs);

  for (const route of router.getRoutes()) {
    const match = matchRoute(route, req);
    if (match) {
      return route.handler(req, res);
    }
  }

  // Fallback

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Default response" }));
};
