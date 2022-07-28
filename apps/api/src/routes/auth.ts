import express from "express";
import { verfiyAccessToken } from "../middleware/auth";
import * as auth from "../controllers/auth";

const router = express.Router();

router.post("/login", auth.login);
router.get("/refresh", auth.refreshToken);
router.post("/register", auth.register);
router.get("/logout", auth.logout);

export default router;
