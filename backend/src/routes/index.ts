import { Router } from "express";
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
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// User endpoints
router.use("/users", userRoutes);

// Category endpoints
router.use("/categories", categoryRoutes);

// SubCategory endpoints
router.use("/sub-categories", subCategoryRoutes);

// Prompt/AI Lesson endpoints
router.use("/prompts", promptsRoutes);

export default router;
