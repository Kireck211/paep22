const logger = function() {
  return function(req, res, next) {
    if (process.env.NODE_ENV === 'test') return next();
    console.log('----- Logger ----');
    console.log(`url: ${req.originalUrl}`);
    console.log(`method: ${req.method}`);
    console.log(`body: ${JSON.stringify(req.body)}`)
    console.log('----- Logger ----');
    console.log();
    next();
  }
}

module.exports = logger;