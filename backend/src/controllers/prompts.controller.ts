import { Request, Response } from "express";
import { createPrompt } from "../services/prompts.service";

export const createPromptHandler = async (req: Request, res: Response) => {
  try {
    const result = await createPrompt(req.body);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
