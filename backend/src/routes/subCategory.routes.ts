import { Router } from "express";
import {
  createSubCategory,
  getSubCategoriesByCategory
} from "../controllers/subCategory.controller";

const router = Router();

router.post("/", createSubCategory);
router.get("/", getSubCategoriesByCategory);

export default router;
