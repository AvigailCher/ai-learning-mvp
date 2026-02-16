import { Response } from "express";

export interface ApiError {
  message: string;
  statusCode: number;
  details?: any;
}

/**
 * Handle errors consistently across the application
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
 * Create a custom API error
 */
export const createError = (message: string, statusCode: number = 500, details?: any): ApiError => {
  return {
    message,
    statusCode,
    details,
  };
};
