import prisma from "../lib/prisma";
import { generateLesson } from "./ai.service";

export const createPrompt = async (data: {
  userId: number;
  categoryId: number;
  subCategoryId: number;
  prompt: string;
}) => {
  const { userId, categoryId, subCategoryId, prompt } = data;

  // 1️⃣ בדיקת קיום משתמש
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error("User not found");
  }

  // 2️⃣ בדיקת קיום קטגוריה
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) {
    throw new Error("Category not found");
  }

  // 3️⃣ בדיקת קיום תת קטגוריה ושייכות לקטגוריה
  const subCategory = await prisma.subCategory.findUnique({
    where: { id: subCategoryId },
  });

  if (!subCategory || subCategory.categoryId !== categoryId) {
    throw new Error("Subcategory does not belong to category");
  }

  // 4️⃣ קריאה ל-AI
  const lesson = await generateLesson(prompt);

  // הגנה נוספת כדי ש-TypeScript לא יתלונן
  const safeLesson = lesson ?? "AI returned empty response";

  // 5️⃣ שמירה במסד נתונים
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

export const getUserPrompts = async (userId: number) => {
  // בדיקת קיום משתמש
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    throw new Error("User not found");
  }

  // קבלת כל הפרומפטים של המשתמש עם פרטי הקטגוריה ותת הקטגוריה
  return await prisma.prompt.findMany({
    where: { userId },
    include: {
      category: true,
      subCategory: true,
    },
    orderBy: { createdAt: "desc" },
  });
};
