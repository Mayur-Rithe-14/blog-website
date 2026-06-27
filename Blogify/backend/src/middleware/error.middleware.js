import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    error = new ApiError(
      err.statusCode || 500,
      err.message || "Internal Server Error",
    );
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errors: error.errors,
  });
};

export default errorHandler;
