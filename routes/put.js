const express = require("express");
const router = express.Router();

const routesConf = require("../config/routes.json");

const handlePut = (req, res) => {
  res.status(200).json({});
};

routesConf.PUT_URLS.forEach((endpoint) => {
  router.put(endpoint, handlePut);
});

module.exports = router;
