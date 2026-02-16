import prisma from "../lib/prisma";

export const createSubCategory = async (
  name: string,
  categoryId: number
) => {
  // 1️⃣ לוודא שהקטגוריה קיימת
  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  });

  if (!category) {
    throw new Error("Category not found");
  }

  // 2️⃣ למנוע כפילות באותה קטגוריה
  const existing = await prisma.subCategory.findFirst({
    where: {
      name,
      categoryId
    }
  });

  if (existing) {
    throw new Error("SubCategory already exists for this category");
  }

  // 3️⃣ יצירה
  return prisma.subCategory.create({
    data: {
      name,
      categoryId
    }
  });
};

export const getSubCategoriesByCategory = async (
  categoryId: number
) => {
  return prisma.subCategory.findMany({
    where: { categoryId }
  });
};
