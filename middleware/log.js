const chalk = require("chalk");
const { rawContentTypes, jsonContentType } = require("../utils/_index");

const logMiddleware = (req, res, next) => {
  const time = chalk.dim(new Date().toLocaleTimeString());
  const method = chalk.magenta(req.method.padEnd(7));
  const url = req.originalUrl;

  console.log(`${time} ${method} ${url}`);

  let contentType = req.headers["content-type"] || "";
  if (contentType) {
    contentType = contentType.split(";")[0].trim().toLowerCase();
  }

  console.log(`\n${chalk.dim("Headers")}\n${chalk.dim(JSON.stringify(req.headers, null, 2))}`);

  const isRaw = rawContentTypes.includes(contentType);
  if (isRaw) {
    const isBuffer = Buffer.isBuffer(req.body);
    if (isBuffer) {
      const body = req.body.toString("base64");
      console.log(`\n${chalk.dim("Payload (RAW)")}\n${chalk.dim(req.body.length + " bytes\n" + body)}`);
    }
  }

  const isJson = contentType === jsonContentType;
  if (isJson) {
    const hasBody = req.body && typeof req.body === "object" && Object.keys(req.body).length > 0;
    if (hasBody) {
      console.log(`\n${chalk.dim("Payload (JSON)")}\n${chalk.cyan(JSON.stringify(req.body, null, 2))}`);
    }
  }

  next();
};

module.exports = logMiddleware;
