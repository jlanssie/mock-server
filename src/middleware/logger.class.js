const colors = {
  cyan: (str) => `\x1b[36m${str}\x1b[0m`,
  green: (str) => `\x1b[32m${str}\x1b[0m`,
  magenta: (str) => `\x1b[35m${str}\x1b[0m`,
  dim: (str) => `\x1b[2m${str}\x1b[0m`,
};

export default class Logger {
  handleRequest(req) {
    const time = colors.green(new Date().toLocaleTimeString());
    const arrow = "⇢";
    const method = colors.cyan(req.method);
    const hasBody = req.body && typeof req.body === "object" && Object.keys(req.body).length > 0;
    const body = hasBody ? `\n\n${colors.dim(JSON.stringify(req.body, null, 2))}` : "";

    console.info(`${time}\n\n${arrow} ${method} ${req.url} ${body}\n`);
  }

  handleResponse(req, res) {
    const arrow = "⇠";
    const status = `${colors.cyan(res.statusCode.toString())}`;
    const hasBody = res.body && typeof res.body === "object" && Object.keys(res.body).length > 0;
    const body = hasBody ? `\n\n${colors.dim(JSON.stringify(res.body, null, 2))}` : "";

    console.info(`${arrow} ${status} ${body}\n`);
  }
}
