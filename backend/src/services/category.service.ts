import prisma from "../lib/prisma";

/**
 * Create a new learning category
 * @param name - Category name (must be unique)
 * @returns Created category object
 */
export const createCategory = async (name: string) => {
  return prisma.category.create({
    data: { name },
  });
};

/**
 * Get all learning categories with their subcategories
 * @returns Array of all categories with associated subcategories
 */
export const getAllCategories = async () => {
  return prisma.category.findMany({
    include: {
      subCategories: true,
    },
  });
};
