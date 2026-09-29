const BodyParser = require("./bodyParser.class");
const Logger = require("./logger.class");

const bodyParser = new BodyParser();
const logger = new Logger();

const preHandleRequest = async (req, res) => {
  await bodyParser.handleRequest(req);
  bodyParser.handleResponse(res);
  logger.handleRequest(req);
};

const postHandleRequest = (req, res) => {
  res.on("finish", () => {
    logger.handleResponse(req, res);
  });
};

module.exports = {
  preHandleRequest: preHandleRequest,
  postHandleRequest: postHandleRequest,
};
