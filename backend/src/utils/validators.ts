import { Request, Response, NextFunction } from "express";

/**
 * Request Validation Middleware
 * Validates request body for required fields
 * Can be used as middleware to validate incoming data
 */
export const validateRequestBody =
  (requiredFields: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const missingFields: { [key: string]: boolean } = {};
    let hasMissing = false;

    for (const field of requiredFields) {
      if (!req.body[field]) {
        missingFields[field] = true;
        hasMissing = true;
      }
    }

    if (hasMissing) {
      return res.status(400).json({
        error: {
          message: "Missing required fields",
          details: { missingFields },
        },
      });
    }

    next();
  };
