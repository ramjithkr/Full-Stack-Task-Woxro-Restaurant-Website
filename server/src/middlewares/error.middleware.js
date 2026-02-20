import logger from "../config/logger.js";

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, {
    method: req.method,
    url: req.originalUrl,
    stack: err.stack,
  });

  res.status(err.statusCode || 500).json({
    status: "error",
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
};

export default errorHandler;
