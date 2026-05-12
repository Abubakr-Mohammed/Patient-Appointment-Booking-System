/**
 * Global error handler middleware.
 * Catches any errors passed via next(err) and returns a structured JSON response.
 */
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({
      error: err.message || "Internal server error",
    });
  }
  
  module.exports = { errorHandler };