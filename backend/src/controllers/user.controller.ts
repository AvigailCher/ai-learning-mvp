import { Request, Response } from "express";
import { createUser, getAllUsers, getUserByPhone } from "../services/user.service";
import { handleError, createError } from "../utils/errorHandler";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        error: {
          message: "Name and phone are required",
          details: { missingFields: { name: !name, phone: !phone } },
        },
      });
    }

    const user = await createUser(name, phone);
    return res.status(201).json(user);
  } catch (error: any) {
    // Handle unique constraint violation (duplicate phone)
    if (error.code === "P2002") {
      return res.status(409).json({
        error: {
          message: "Phone number already registered",
          details: { field: error.meta?.target },
        },
      });
    }
    handleError(error, res, 500);
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error: any) {
    handleError(error, res, 500);
  }
};

/**
 * Get user by phone number
 * Used for login functionality - checks if user exists
 */
export const getUserByPhoneController = async (req: Request, res: Response) => {
  try {
    const { phone } = req.query;

    if (!phone) {
      return res.status(400).json({
        error: {
          message: "Phone number is required",
        },
      });
    }

    const user = await getUserByPhone(phone as string);

    if (!user) {
      return res.status(404).json({
        error: {
          message: "User not found",
        },
      });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    handleError(error, res, 500);
  }
};
