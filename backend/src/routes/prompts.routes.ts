import { Router } from "express";
import { createPromptHandler, getUserPrompts } from "../controllers/prompts.controller";

const router = Router();

router.post("/", createPromptHandler);
router.get("/:userId", getUserPrompts);

export default router;
