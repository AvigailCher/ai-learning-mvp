import { Request, Response } from "express";
import * as promptsService from "../services/prompts.service";
import { handleError } from "../utils/errorHandler";

/**
 * Create a new prompt and generate AI lesson
 * POST /api/prompts
 * @param req - Express request with userId, categoryId, subCategoryId, and prompt in body
 * @param res - Express response
 * @returns 201 Created with prompt and AI-generated response
 */
export const createPromptHandler = async (req: Request, res: Response) => {
  try {
    const { userId, categoryId, subCategoryId, prompt } = req.body;

    if (!userId || !categoryId || !subCategoryId || !prompt) {
      return res.status(400).json({
        error: {
          message: "Missing required fields",
          details: {
            missingFields: {
              userId: !userId,
              categoryId: !categoryId,
              subCategoryId: !subCategoryId,
              prompt: !prompt,
            },
          },
        },
      });
    }

    const result = await promptsService.createPrompt({
      userId,
      categoryId,
      subCategoryId,
      prompt,
    });
    res.status(201).json(result);
  } catch (error: any) {
    handleError(error, res, 400);
  }
};

/**
 * Get all prompts for a specific user
 * GET /api/prompts/:userId
 * @param req - Express request with userId in URL params
 * @param res - Express response
 * @returns 200 OK with array of user's prompts
 */
export const getUserPrompts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: {
          message: "userId parameter is required",
        },
      });
    }

    const prompts = await promptsService.getUserPrompts(Number(userId));
    res.json(prompts);
  } catch (error: any) {
    handleError(error, res, 500);
  }
};
