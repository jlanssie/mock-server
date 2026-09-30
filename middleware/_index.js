import BodyParser from "./bodyParser.class.js";
import Logger from "./logger.class.js";

const bodyParser = new BodyParser();
const logger = new Logger();

export const preHook = async (req, res) => {
  await bodyParser.handleRequest(req);
  bodyParser.handleResponse(res);
  logger.handleRequest(req);
};

export const postHook = (req, res) => {
  res.on("finish", () => {
    logger.handleResponse(req, res);
  });
};
