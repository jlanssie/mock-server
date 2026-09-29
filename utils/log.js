const chalk = require("chalk");

const logJson = (json) => {
  console.log(`\n${chalk.cyan(JSON.stringify(json, null, 2))}`);
};

module.exports = logJson;
