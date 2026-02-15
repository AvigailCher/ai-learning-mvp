import prisma from "../lib/prisma";

export const createUser = async (name: string, phone: string) => {
  return await prisma.user.create({
    data: {
      name,
      phone,
    },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      prompts: true,
    },
  });
};
