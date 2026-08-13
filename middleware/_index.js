const express = require("express");
const logMiddleware = require("./log");

const initMiddleware = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(logMiddleware);
};

module.exports = {
  initMiddleware,
};
