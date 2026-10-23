const chalk = require("chalk");
const { rawContentTypes, jsonContentType } = require("../utils/_index");

const logMiddleware = (req, res, next) => {
  const time = new Date().toLocaleTimeString();
  const method = chalk.magenta(req.method.padEnd(7));
  const url = req.originalUrl;

  console.log(`\n${time} ${method} ${url}\n`);

  let contentType = req.headers["content-type"] || "";
  if (contentType) {
    contentType = contentType.split(";")[0].trim().toLowerCase();
  }

  for (const [key, value] of Object.entries(req.headers)) {
    const isImportant = ["content-type", "content-length", "authorization"].includes(key);
    const headerKey = isImportant ? chalk.cyan(key) : chalk.dim(key);
    const headerVal = isImportant ? chalk.white(value) : chalk.dim(value);
    console.log(`${headerKey}: ${headerVal}`);
  }

  const isRaw = rawContentTypes.includes(contentType);
  if (isRaw) {
    const isBuffer = Buffer.isBuffer(req.body);
    if (isBuffer) {
      console.log(`\n${chalk.dim(req.body.toString("base64"))}`);
    }
  }

  const isJson = contentType === jsonContentType;
  if (isJson) {
    const hasBody = req.body && typeof req.body === "object" && Object.keys(req.body).length > 0;
    if (hasBody) {
      console.log(`\n${chalk.dim(JSON.stringify(req.body, null, 2))}`);
    }
  }

  next();
};

module.exports = logMiddleware;
