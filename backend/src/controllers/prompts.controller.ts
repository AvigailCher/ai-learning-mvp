import { Request, Response } from "express";
import * as promptsService from "../services/prompts.service";
import { handleError } from "../utils/errorHandler";

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
