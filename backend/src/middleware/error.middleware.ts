import { Request, Response, NextFunction } from "express";
import { appError } from "../utils/appError.js";

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("❌ Error:", err);

  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof appError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  
  else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
}