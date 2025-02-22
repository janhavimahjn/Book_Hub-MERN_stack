import { Router } from "express";
const router = Router();
import { register, login } from "../controllers/authController";

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

export default router;
