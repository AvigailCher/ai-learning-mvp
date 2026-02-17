import express from "express";
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

export default app;
