import { Router } from "express";
import { registerUser, listUsers, getUserByPhoneController } from "../controllers/user.controller";

const router = Router();

router.post("/", registerUser);
router.get("/", listUsers);
router.get("/by-phone", getUserByPhoneController);

export default router;
