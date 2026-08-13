const express = require("express");
const router = express.Router();

const routesConf = require("../config/routes.json");

const handleDelete = (req, res) => {
  res.status(200).json({});
};

routesConf.DELETE_URLS.forEach((endpoint) => {
  router.delete(endpoint, handleDelete);
});

module.exports = router;
