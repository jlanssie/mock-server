const defaultRoute = require("./default");
const getRouter = require("./get");
const postRouter = require("./post");
const putRouter = require("./put");
const deleteRouter = require("./delete");

const initRoutes = (app) => {
  app.use(getRouter);
  app.use(postRouter);
  app.use(putRouter);
  app.use(deleteRouter);

  app.use(defaultRoute);
};

module.exports = { initRoutes };
