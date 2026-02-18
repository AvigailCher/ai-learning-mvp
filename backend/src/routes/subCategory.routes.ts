import { Router } from "express";
import {
  createSubCategory,
  getSubCategoriesByCategory
} from "../controllers/subCategory.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

/**
 * @swagger
 * /api/sub-categories:
 *   post:
 *     summary: Create a new subcategory
 *     description: Creates a new subcategory under a specific category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Data Structures"
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Invalid category ID or missing fields
 */
router.post("/", asyncHandler(createSubCategory));

/**
 * @swagger
 * /api/sub-categories:
 *   get:
 *     summary: Get subcategories by category
 *     description: Retrieves all subcategories for a specific category
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: List of subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubCategory'
 *       400:
 *         description: Missing or invalid category ID
 */
router.get("/", asyncHandler(getSubCategoriesByCategory));

export default router;
