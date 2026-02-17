import prisma from "../lib/prisma";

/**
 * Create a new subcategory under a specific category
 * @param name - Subcategory name (must be unique within the category)
 * @param categoryId - ID of the parent category
 * @returns Created subcategory object
 * @throws Error if category not found or subcategory already exists
 */
export const createSubCategory = async (
  name: string,
  categoryId: number
) => {
  // Verify that the parent category exists
  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  });

  if (!category) {
    throw new Error("Category not found");
  }

  // Check if subcategory with same name already exists in this category
  const existing = await prisma.subCategory.findFirst({
    where: {
      name,
      categoryId
    }
  });

  if (existing) {
    throw new Error("SubCategory already exists for this category");
  }

  // Create the subcategory
  return prisma.subCategory.create({
    data: {
      name,
      categoryId
    }
  });
};

/**
 * Get all subcategories for a specific category
 * @param categoryId - ID of the parent category
 * @returns Array of subcategories belonging to the category
 */
export const getSubCategoriesByCategory = async (
  categoryId: number
) => {
  return prisma.subCategory.findMany({
    where: { categoryId }
  });
};
