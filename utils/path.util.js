const matchPath = (routePath, requestPath) => {
  const routeSegments = routePath.split("/").filter(Boolean);
  const reqSegments = requestPath.split("/").filter(Boolean);

  if (routeSegments.length !== reqSegments.length) {
    return { matches: false };
  }

  const params = {};

  for (let i = 0; i < routeSegments.length; i++) {
    const routeSeg = routeSegments[i];
    const reqSeg = reqSegments[i];

    if (routeSeg.startsWith(":")) {
      params[routeSeg.slice(1)] = reqSeg;
    } else if (routeSeg !== reqSeg) {
      return { matches: false };
    }
  }

  return { matches: true, params };
};

module.exports = matchPath;
