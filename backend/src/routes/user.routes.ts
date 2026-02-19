import { Router } from "express";
import { registerUser, listUsers, getUserByPhoneController } from "../controllers/user.controller";
import { asyncHandler } from "../utils/asyncHandler";
import { validateBody, registerUserSchema } from "../utils/zodValidation";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register new user or login existing user
 *     description: Creates a new user if phone doesn't exist, or returns existing user if phone already registered
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       409:
 *         description: Phone number already registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Missing required fields
 */
router.post("/", validateBody(registerUserSchema), asyncHandler(registerUser));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users with their prompts
 *     description: Retrieves list of all users and their learning history
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", asyncHandler(listUsers));

/**
 * @swagger
 * /api/users/by-phone:
 *   get:
 *     summary: Get user by phone number
 *     description: Used for login - checks if user exists
 *     parameters:
 *       - in: query
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *         example: "1234567890"
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/by-phone", asyncHandler(getUserByPhoneController));

export default router;
