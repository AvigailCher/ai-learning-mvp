import { Router } from "express";
import { registerUser, listUsers } from "../controllers/user.controller";

const router = Router();

router.post("/", registerUser);
router.get("/", listUsers);

export default router;
