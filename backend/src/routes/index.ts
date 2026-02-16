import { Router } from "express";
import userRoutes from "./user.routes";
import categoryRoutes from "./category.routes"; 
import subCategoryRoutes from "./subCategory.routes";
import promptsRoutes from "./prompts.routes";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.use("/users", userRoutes);


router.use("/categories", categoryRoutes);

router.use("/sub-categories", subCategoryRoutes);

router.use("/prompts", promptsRoutes);
export default router;
