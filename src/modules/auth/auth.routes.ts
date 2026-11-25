
import { Router } from "express";
import { register } from "./controllers/register.controller.js";
import { login } from "./controllers/login.controller.js";
import { getMe } from "./controllers/me.controller.js";
import { verifyAuth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyAuth, getMe);

export default router;
