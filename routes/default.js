const defaultRoute = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Default reponse" }));
};

module.exports = defaultRoute;
