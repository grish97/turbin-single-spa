import { NextFunction, Request, Response } from "express";
import { fromEnv } from "../configs/envConfig";
import AppError from "../services/AppError";

/**
 * Production error response
 * @param {any} err
 * @param {Response} res
 */
function sendErrorProd(err: any, res: Response) {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something wen wrong",
    });
  }
}

/* Development error response
 * @param {any} err
 * @param {Response} res
 */
function sendErrorDev(err: any, res: Response) {
  res.status(err.statusCode).json({
    success: false,
    error: err,
    message: err.message,
    stack: err.stack,
  });
}

/**
 * A request with an invalid Mongo ID (Mongo DB)
 * @param {any} err
 * @returns {any}
 */
function handleCastErrorDB(err: any) {
  const message = `Inavlid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
}

/**
 * A duplicate key (Mongo DB)
 * @param {any} err
 * @returns {any}
 */
function handleDuplicateFieldsDB(err: any) {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use anothe value!`;
  return new AppError(message, 400);
}

/**
 * Other validation errors (Mongo DB)
 * @param {any} err
 * @returns {any}
 */
function handleValidationErrorDb(err: any) {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;

  return new AppError(message, 400);
}

/**
 * Error Middleware
 * @param {any} err
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const mode = fromEnv("NODE_ENV");

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (mode === "production") {
    sendErrorProd(err, res);
  } else if (mode === "development") {
    let error: any = {
      name: err.name,
      message: err.message,
      statusCode: err.statusCode,
      code: err.code,
      path: err.path,
      value: err.value,
      errmsg: err.errmsg,
      errors: err.errors,
    };

    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }

    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }

    if (error.name === "ValidationError") {
      error = handleValidationErrorDb(err);
    }
    sendErrorDev(error, res);
  }
}
