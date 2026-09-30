const colors = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  magenta: (s) => `\x1b[35m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

function formatStatus(status) {
  const code = String(status);
  if (status >= 500) return colors.red(code);
  if (status >= 400) return colors.yellow(code);
  if (status >= 300) return colors.cyan(code);
  if (status >= 200) return colors.green(code);
  return code;
}

function formatBody(body) {
  if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
    return "";
  }
  return `${colors.cyan(`${JSON.stringify(body)}`)}`;
}

export default class Logger {
  handleRequest(req) {
    req._startTime = performance.now();

    const time = colors.dim(new Date().toISOString());
    const method = colors.cyan(req.method.padEnd(6));
    const body = formatBody(req.body);

    console.info(`${time} ${colors.green("⇢")} ${method} ${req.url} ${body}`);
  }

  handleResponse(req, res) {
    const duration = req._startTime ? `${(performance.now() - req._startTime).toFixed(2)}ms` : "";

    const time = colors.dim(new Date().toISOString());
    const status = formatStatus(res.statusCode.toString().padEnd(6));
    const latency = colors.dim(duration);
    const body = formatBody(res.body);

    console.info(`${time} ${colors.magenta("⇠")} ${status} ${req.url} ${latency} ${body}`);
  }
}
