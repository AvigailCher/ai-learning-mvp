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

/**
 * Get user by phone number
 * Used for login - checks if user exists
 */
export const getUserByPhone = async (phone: string) => {
  return await prisma.user.findUnique({
    where: { phone },
    include: {
      prompts: true,
    },
  });
};
