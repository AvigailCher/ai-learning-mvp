import { Request, Response, NextFunction } from "express";

/**
 * Async Route Handler Wrapper
 * Wraps async route handlers to catch errors and pass them to the global error handler
 * Eliminates the need for try-catch in every route handler
 * 
 * Usage:
 * router.get("/users", asyncHandler(async (req, res) => {
 *   const users = await getUsersFromDB();
 *   res.json(users);
 * }));
 */
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
