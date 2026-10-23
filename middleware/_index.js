const express = require("express");
const logMiddleware = require("./log");
const { rawContentTypes } = require("../utils/_index");

const initMiddleware = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.raw({ type: rawContentTypes, limit: "10mb" }));
  app.use(logMiddleware);
};

module.exports = {
  initMiddleware,
};
