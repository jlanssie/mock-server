const MIN_PORT = 1025;
const MAX_PORT = 65535;

const EXCLUDED_PORTS = new Set([3000, 3001, 4200, 5000, 5173, 8000, 8080, 8443, 8888, 3306, 5432, 6379, 27017, 1433, 9200]);

const getPort = () => {
  let port;
  do {
    port = Math.floor(Math.random() * (MAX_PORT - MIN_PORT + 1)) + MIN_PORT;
  } while (EXCLUDED_PORTS.has(port));

  return port;
};

module.exports = getPort;
