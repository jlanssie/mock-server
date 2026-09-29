class Router {
  constructor() {
    this.routes = [];
  }

  addRoute(method, path, handler) {
    this.routes.push({ method, path, handler });
  }

  getRoutes() {
    return this.routes;
  }

  initRoutes(methodConfigs = []) {
    for (const { method, urls, response } of methodConfigs) {
      for (const path of urls || []) {
        this.addRoute(method, path, (req, res) => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(response));
        });
      }
    }
    return this;
  }
}

module.exports = Router;
