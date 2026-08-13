const chalk = require("chalk");

const logMiddleware = (req, res, next) => {
  const time = chalk.dim(new Date().toLocaleTimeString());
  const method = chalk.magenta(req.method.padEnd(7));
  const url = req.originalUrl;

  const hasBody = req.body && typeof req.body === "object" && Object.keys(req.body).length > 0;

  const body = hasBody ? `\n${chalk.cyan(JSON.stringify(req.body, null, 2))}` : "";

  console.log(`${time} ${method} ${url} ${body}`);
  next();
};

module.exports = logMiddleware;
