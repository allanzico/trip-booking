export {};

const ErrorResponse = require("../lib/errorResponse");

const errorHandler = (err: any,  res: any,) => {
  let error = { ...err };
  error.message = err.message;

  if (err.code === 11000) {
    const message = "Duplicate Field Valued Enter";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "validationError") {
    const message = Object.values(err.errors).map((val: any) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: error.message || "Server error",
  });
};

module.exports = errorHandler;
