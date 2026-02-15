import { Router } from "express";
import userRoutes from "./user.routes";
import categoryRoutes from "./category.routes"; 
import subCategoryRoutes from "./subCategory.routes";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.use("/users", userRoutes);


router.use("/categories", categoryRoutes);

router.use("/sub-categories", subCategoryRoutes);

export default router;
