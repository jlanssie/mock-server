const chalk = require("chalk");

const logMiddleware = (req, res, next) => {
  const time = chalk.dim(new Date().toLocaleTimeString());
  const method = chalk.magenta(req.method.padEnd(7));
  const url = req.originalUrl;

  console.log(`${time} ${method} ${url}`);

  const hasBody = req.body && typeof req.body === "object" && Object.keys(req.body).length > 0;

  if (hasBody) {
    console.log(`\n${chalk.cyan(JSON.stringify(req.body, null, 2))}`);
  }

  next();
};

module.exports = logMiddleware;
