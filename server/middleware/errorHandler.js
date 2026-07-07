/**
 * Catches any error passed to next(err) from controllers and formats a
 * consistent JSON error response. Having one place for this means every
 * route returns errors in the same shape, which makes the frontend's
 * error-handling code simpler.
 */
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose "CastError" usually means a malformed ObjectId was passed
  // in a route param, e.g. GET /api/contacts/not-a-real-id
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // Mongoose validation errors (in case they slip past express-validator)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      message: messages.join(", "),
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong on the server",
  });
};

/**
 * Handles any request that doesn't match a defined route.
 * Placed last in the middleware chain in server.js.
 */
export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};
