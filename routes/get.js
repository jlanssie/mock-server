const express = require("express");
const router = express.Router();

const routesConf = require("../config/routes.json");
const mockData = require("../mock/data.json");

const handleGet = (req, res) => {
  res.status(200).json(mockData);
};

routesConf.GET_URLS.forEach((endpoint) => {
  router.get(endpoint, handleGet);
});

module.exports = router;
