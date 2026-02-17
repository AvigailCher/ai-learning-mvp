import { PrismaClient } from "../generated/prisma";

/**
 * Prisma ORM client instance
 * Singleton instance for database operations
 */
const prisma = new PrismaClient();

export default prisma;
