const defaultRoute = (req, res) => {
  res.status(200).json({ message: "Default response" });
};

module.exports = defaultRoute;
