const express = require("express");
const app = express();
const port = 1080;

const mockFirstDossier = require("./data/first/accounting/ws/dossier/data.json");
const mockSitranProfiles = require("./data/sitran-profiles/data.json");

const requestLogger = (req, res, next) => {
  console.info(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}\n`);
  next();
};

app.use(requestLogger);
app.use(express.json());

app.get("/sitran-profiles/:id", (req, res) => {
  res
    .json(mockSitranProfiles)
    .status(200);
});

app.post("/first/accounting/ws/dossier", (req, res) => {
  res
    .json(mockFirstDossier)
    .status(200);
});

app.post("/first/accounting/provision/ws/dossier", (req, res) => {
  res.status(200).json({});
});

app.listen(port, () => {
  console.log(`Express.js running at http://localhost:${port}\n----\n`);
});
