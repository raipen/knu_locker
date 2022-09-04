module.exports = {errorCatcher: function (fn) {
    return function (req, res, next) {
      fn(req, res, next).catch(next)
    }
  },
  errorHandling: function (error, req, res, next) {
    res.status(400).json({success: false, message: error.message })
  }
}