const moment = require('moment');
const pool = require('../database/config');

const logger = (req, res, next) => {
  pool.getConnection(function(err) {
    if (err) {
      res.status(500).json({ msg: `Server Down`});
    } else {
      console.log(`Connected`);
    }
  });
  next();
};

module.exports = logger;