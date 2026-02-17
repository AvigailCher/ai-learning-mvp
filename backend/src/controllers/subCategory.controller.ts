import { Request, Response } from "express";
import * as subCategoryService from "../services/subCategory.service";
import { handleError } from "../utils/errorHandler";

/**
 * Create a new subcategory under a category
 * POST /api/sub-categories
 * @param req - Express request with name and categoryId in body
 * @param res - Express response
 * @returns 201 Created or 409 Conflict (duplicate in same category)
 */
export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({
        error: {
          message: "Name and categoryId are required",
          details: { missingFields: { name: !name, categoryId: !categoryId } },
        },
      });
    }

    const subCategory = await subCategoryService.createSubCategory(
      name,
      Number(categoryId)
    );

    res.status(201).json(subCategory);
  } catch (error: any) {
    // Handle unique constraint violation (duplicate subcategory in same category)
    if (error.code === "P2002") {
      return res.status(409).json({
        error: {
          message: "SubCategory with this name already exists in this category",
          details: { field: error.meta?.target },
        },
      });
    }
    handleError(error, res, 400);
  }
};

/**
 * Get all subcategories for a specific category
 * GET /api/sub-categories?categoryId={id}
 * @param req - Express request with categoryId in query params
 * @param res - Express response
 * @returns 200 OK with array of subcategories
 */
export const getSubCategoriesByCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({
        error: {
          message: "categoryId query parameter is required",
        },
      });
    }

    const subCategories =
      await subCategoryService.getSubCategoriesByCategory(
        Number(categoryId)
      );

    res.json(subCategories);
  } catch (error: any) {
    handleError(error, res, 500);
  }
};
