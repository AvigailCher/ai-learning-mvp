import { Request, Response } from "express";
import * as subCategoryService from "../services/subCategory.service";

export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({ message: "Name and categoryId are required" });
    }

    const subCategory = await subCategoryService.createSubCategory(
      name,
      Number(categoryId)
    );

    res.status(201).json(subCategory);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getSubCategoriesByCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const { categoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({ message: "categoryId query param is required" });
    }

    const subCategories =
      await subCategoryService.getSubCategoriesByCategory(
        Number(categoryId)
      );

    res.json(subCategories);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
