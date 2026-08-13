const express = require("express");
const router = express.Router();

const routesConf = require("../config/routes.json");

const handlePost = (req, res) => {
  res.status(200).json({});
};

routesConf.POST_URLS.forEach((endpoint) => {
  router.post(endpoint, handlePost);
});

module.exports = router;
