import { Request, Response } from "express";
import * as categoryService from "../services/category.service";
import { handleError } from "../utils/errorHandler";

/**
 * Create a new learning category
 * POST /api/categories
 * @param req - Express request with name in body
 * @param res - Express response
 * @returns 201 Created or 409 Conflict (duplicate name)
 */
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: {
          message: "Name is required",
        },
      });
    }

    const category = await categoryService.createCategory(name);
    res.status(201).json(category);
  } catch (error: any) {
    // Handle unique constraint violation (duplicate category name)
    if (error.code === "P2002") {
      return res.status(409).json({
        error: {
          message: "Category with this name already exists",
          details: { field: error.meta?.target },
        },
      });
    }
    handleError(error, res, 500);
  }
};

/**
 * Get all learning categories with their subcategories
 * GET /api/categories
 * @param req - Express request
 * @param res - Express response
 * @returns 200 OK with array of categories
 */
export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error: any) {
    handleError(error, res, 500);
  }
};
