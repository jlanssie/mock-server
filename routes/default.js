const defaultRoute = (req, res) => {
  res.status(200).json({ message: "Default reponse" });
};

module.exports = defaultRoute;
