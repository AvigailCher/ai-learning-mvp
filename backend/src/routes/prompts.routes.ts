import { Router } from "express";
import { createPromptHandler } from "../controllers/prompts.controller";

const router = Router();

router.post("/", createPromptHandler);

export default router;
