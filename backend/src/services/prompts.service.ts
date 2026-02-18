import prisma from "../lib/prisma";
import { generateLesson } from "./ai.service";

/**
 * Create a new prompt and generate AI lesson
 * @param data - Prompt data containing userId, categoryId, subCategoryId, and prompt text
 * @returns Created prompt with AI-generated response
 * @throws Error if user, category, or subcategory not found
 */
export const createPrompt = async (data: {
  userId: number;
  categoryId: number;
  subCategoryId: number;
  prompt: string;
}) => {
  const { userId, categoryId, subCategoryId, prompt } = data;

  // Verify user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error("User not found");
  }

  // Verify category exists
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) {
    throw new Error("Category not found");
  }

  // Verify subcategory exists and belongs to category
  const subCategory = await prisma.subCategory.findUnique({
    where: { id: subCategoryId },
  });

  if (!subCategory || subCategory.categoryId !== categoryId) {
    throw new Error("Subcategory does not belong to category");
  }

  // Generate lesson using OpenAI
  const lesson = await generateLesson(
  category.name,
  subCategory.name,
  prompt
);


  // Ensure TypeScript type safety
  const safeLesson = lesson ?? "AI returned empty response";

  // Save prompt and response to database
  const created = await prisma.prompt.create({
    data: {
      userId,
      categoryId,
      subCategoryId,
      prompt,
      response: safeLesson,
    },
  });

  return created;
};

/**
 * Get all prompts for a specific user
 * @param userId - The ID of the user
 * @returns Array of prompts with associated category and subcategory details
 * @throws Error if user not found
 */
export const getUserPrompts = async (userId: number) => {
  // Verify user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error("User not found");
  }

  // Retrieve user's prompts with related category and subcategory information
  return await prisma.prompt.findMany({
    where: { userId },
    include: {
      category: true,
      subCategory: true,
    },
    orderBy: { createdAt: "desc" },
  });
};
