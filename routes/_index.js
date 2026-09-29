const defaultRoute = require("./default");
const Router = require("./router.class");
const matchPath = require("../utils/path.util");

const routesConfig = require("../config/routes.json");
const mockData = require("../mock/data.json");

const methodConfigs = [
  { method: "GET", urls: routesConfig.GET_URLS, response: mockData },
  { method: "POST", urls: routesConfig.POST_URLS, response: {} },
  { method: "PUT", urls: routesConfig.PUT_URLS, response: {} },
  { method: "DELETE", urls: routesConfig.DELETE_URLS, response: {} },
];

const handleRequest = (req, res) => {
  const router = new Router().initRoutes(methodConfigs);

  const [pathname, queryString] = (req.url || "/").split("?");
  const method = req.method?.toUpperCase();

  for (const route of router.getRoutes()) {
    if (route.method === method) {
      const { matches, params } = matchPath(route.path, pathname);
      if (matches) {
        const query = Object.fromEntries(new URLSearchParams(queryString));
        return route.handler(req, res, { params, query });
      }
    }
  }

  return defaultRoute(req, res);
};

module.exports = {
  handleRequest,
  matchPath,
  Router,
  methodConfigs,
};
