import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";
import routes from "./routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// API routes
app.use("/api", routes);

// Health check endpoint
app.get("/", (req, res) => {
  res.send("API is running");
});

/**
 * Global Error Handler Middleware
 * Catches all unhandled errors from async route handlers
 * Must be the last middleware
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";
  const details = err.details || null;

  console.error(`[${statusCode}] Error:`, {
    message,
    details,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json({
    error: {
      message,
      ...(details && { details }),
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
});

/**
 * 404 Not Found Handler
 * Handles requests to undefined routes
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: {
      message: "Route not found",
      details: { path: req.path, method: req.method },
    },
  });
});

export default app;
