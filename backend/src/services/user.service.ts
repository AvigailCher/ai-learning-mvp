import prisma from "../lib/prisma";

/**
 * Create a new user
 * @param name - User's full name
 * @param phone - User's phone number (unique identifier)
 * @returns Created user object
 */
export const createUser = async (name: string, phone: string) => {
  return await prisma.user.create({
    data: {
      name,
      phone,
    },
  });
};

/**
 * Get all users with their prompts
 * @returns Array of all users including their learning history
 */
export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      prompts: true,
    },
  });
};

/**
 * Get user by phone number (used for login)
 * @param phone - User's phone number
 * @returns User object with prompts if found, null otherwise
 */
export const getUserByPhone = async (phone: string) => {
  return await prisma.user.findUnique({
    where: { phone },
    include: {
      prompts: true,
    },
  });
};
