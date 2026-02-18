import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import userRoutes from "./user.routes";
import categoryRoutes from "./category.routes"; 
import subCategoryRoutes from "./subCategory.routes";
import promptsRoutes from "./prompts.routes";

const router = Router();

/**
 * Health check endpoint
 * GET /api/health
 * @returns Status indicator
 */
router.get("/health", asyncHandler(async (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
}));

// User endpoints
router.use("/users", userRoutes);

// Category endpoints
router.use("/categories", categoryRoutes);

// SubCategory endpoints
router.use("/sub-categories", subCategoryRoutes);

// Prompt/AI Lesson endpoints
router.use("/prompts", promptsRoutes);

export default router;
