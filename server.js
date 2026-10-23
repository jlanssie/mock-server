const express = require("express");
const app = express();

const { initMiddleware } = require("./middleware/_index");
const { initRoutes } = require("./routes/_index");
const { getPort } = require("./utils/_index");

const port = getPort();

initMiddleware(app);
initRoutes(app);

app.listen(port, () => {
  console.info(`\nMock server listening to port ${port} ⚡\n`);
});
