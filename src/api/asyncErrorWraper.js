const Sequelize = require('sequelize');

module.exports = {errorCatcher: function (fn) {
    return function (req, res, next) {
      fn(req, res, next).catch(next)
    }
  },
  errorHandling: function (error, req, res, next) {
    if(error instanceof Sequelize.Error)
      res.status(400).json({success: false, message: "database error" });
    else
      res.status(400).json({success: false, message: error.message })
  }
}