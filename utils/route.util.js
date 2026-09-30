export const matchRoute = (route, req) => {
  if (route?.method?.toUpperCase() !== req?.method?.toUpperCase()) {
    return false;
  }

  const pathname = (req?.url || req?.pathname || "").split("?")[0];
  const routeSegments = (route?.path || "").split("/").filter(Boolean);
  const reqSegments = pathname.split("/").filter(Boolean);

  if (routeSegments.length !== reqSegments.length) {
    return false;
  }

  return routeSegments.every((routeSeg, i) => {
    return routeSeg.startsWith(":") || routeSeg === reqSegments[i];
  });
};
