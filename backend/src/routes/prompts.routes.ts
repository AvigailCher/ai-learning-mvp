import { Router } from "express";
import { createPromptHandler, getUserPrompts } from "../controllers/prompts.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

/**
 * @swagger
 * /api/prompts:
 *   post:
 *     summary: Generate lesson with AI
 *     description: Creates a new learning prompt and generates a lesson using OpenAI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - categoryId
 *               - subCategoryId
 *               - prompt
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               subCategoryId:
 *                 type: integer
 *                 example: 1
 *               prompt:
 *                 type: string
 *                 example: "Explain how arrays work in Python"
 *     responses:
 *       201:
 *         description: Lesson generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prompt'
 *       400:
 *         description: Missing required fields or invalid IDs
 *       500:
 *         description: AI generation failed
 */
router.post("/", asyncHandler(createPromptHandler));

/**
 * @swagger
 * /api/prompts/{userId}:
 *   get:
 *     summary: Get user's learning history
 *     description: Retrieves all lessons and prompts created by a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: User's prompt history
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prompt'
 *       404:
 *         description: User not found
 */
router.get("/:userId", asyncHandler(getUserPrompts));

export default router;
