/**
 * Centralized error factory and Express error middleware.
 * Returns consistent JSON responses for API consumers.
 */

function createError(message, statusCode = 500, details = null) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;
  return error;
}

function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;
  const isClientError = statusCode >= 400 && statusCode < 500;

  if (!isClientError) {
    console.error('Unhandled error:', err);
  }

  const response = {
    success: false,
    error: err.message || 'Internal server error',
  };

  if (err.details) {
    response.details = err.details;
  }

  if (process.env.NODE_ENV === 'development' && !isClientError) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

module.exports = { createError, errorHandler };
