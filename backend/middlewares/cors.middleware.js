const allowedCors = [
  'https://mesto422.nomoredomains.work/',
  'http://mesto422.nomoredomains.work/',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS';

function checkCors(req, res, next) {
  const requestHeaders = req.headers['access-control-request-headers'];
  const { origin } = req.headers;
  const { method } = req;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);

      return res.end();
    }
  }

  return next();
}

module.exports = checkCors;
