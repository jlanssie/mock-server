export default class Router {
  constructor() {
    this.routes = [];
  }

  addRoute(method, path, handler) {
    this.routes.push({ method, path, handler });
  }

  getRoutes() {
    return this.routes;
  }

  initRoutes() {
    this.addRoute("GET", "/test", (req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Test response" }));
    });

    return this;
  }
}
