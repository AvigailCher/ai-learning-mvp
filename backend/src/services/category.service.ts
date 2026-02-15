import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const createCategory = async (name: string) => {
  return prisma.category.create({
    data: { name },
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({
    include: {
      subCategories: true,
    },
  });
};
