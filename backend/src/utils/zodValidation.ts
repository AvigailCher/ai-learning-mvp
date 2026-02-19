import { z } from "zod";
import { Request, Response, NextFunction } from "express";

// Example: Zod schema for user registration
export const registerUserSchema = z.object({
  name: z.string().min(2, "שם לא חוקי: יש להזין לפחות שתי אותיות"),
  phone: z.string().min(10, "טלפון לא תקין: יש להזין לפחות 10 ספרות"),
});

// Middleware to validate request body with a given Zod schema
export function validateBody(schema: z.ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation error",
  details: result.error.issues,
      });
    }
    req.body = result.data;
    next();
  };
}
