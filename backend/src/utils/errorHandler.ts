import { Response } from "express";

/**
 * Standard API error response interface
 */
export interface ApiError {
  message: string;
  statusCode: number;
  details?: any;
}

/**
 * Handle errors consistently across the application
 * Logs error details and returns structured error response
 * @param error - The error object
 * @param res - Express response object
 * @param defaultStatusCode - Default HTTP status code (default: 500)
 */
export const handleError = (error: any, res: Response, defaultStatusCode: number = 500) => {
  const statusCode = error.statusCode || defaultStatusCode;
  const message = error.message || "Internal server error";
  const details = error.details || null;

  console.error(`[${statusCode}] Error:`, {
    message,
    details,
    stack: error.stack,
  });

  res.status(statusCode).json({
    error: {
      message,
      ...(details && { details }),
    },
  });
};

/**
 * Create a custom API error object
 * @param message - Error message
 * @param statusCode - HTTP status code (default: 500)
 * @param details - Optional additional error details
 * @returns ApiError object
 */
export const createError = (message: string, statusCode: number = 500, details?: any): ApiError => {
  return {
    message,
    statusCode,
    details,
  };
};
