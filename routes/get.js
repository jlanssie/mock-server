const express = require("express");
const router = express.Router();

const routesConf = require("../config/routes.json");
const mockData = require("../mock/data.json");
const { logJson } = require("../utils/_index");

const handleGet = (req, res) => {
  logJson(mockData);
  res.status(200).json(mockData);
};

routesConf.GET_URLS.forEach((endpoint) => {
  router.get(endpoint, handleGet);
});

module.exports = router;
