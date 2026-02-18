import { Router } from "express";
import * as categoryController from "../controllers/category.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new learning category
 *     description: Creates a new category for organizing learning content
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Python Programming"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       409:
 *         description: Category already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", asyncHandler(categoryController.createCategory));

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all learning categories
 *     description: Retrieves all available learning categories with their subcategories
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/", asyncHandler(categoryController.getAllCategories));

export default router;

