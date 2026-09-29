const chalk = require("chalk");

class Logger {
  handleRequest(req) {
    const time = chalk.cyan(new Date().toLocaleTimeString());

    const arrow = `${chalk.green("⇢")}`;
    const method = chalk.magenta(req.method);

    const hasBody = req.body && typeof req.body === "object" && Object.keys(req.body).length > 0;
    const body = hasBody ? `\n\n${chalk.dim(JSON.stringify(req.body, null, 2))}` : "";

    console.info(`${time}\n\n${arrow} ${method} ${req.url} ${body}\n`);
  }

  handleResponse(req, res) {
    const arrow = `${chalk.green("⇠")}`;
    const status = `${chalk.magenta(res.statusCode.toString())}`;

    const hasBody = res.body && typeof res.body === "object" && Object.keys(res.body).length > 0;
    const body = hasBody ? `\n\n${chalk.dim(JSON.stringify(res.body, null, 2))}` : "";

    console.info(`${arrow} ${status} ${body}\n`);
  }
}

module.exports = Logger;
