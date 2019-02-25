const moment = require('moment');

const logger = (req, res, next) => {
  console.log(
    `${res.statusCode} ${req.method} ${req.path}`
  );
  next();
};

module.exports = logger;