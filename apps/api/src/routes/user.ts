import express from "express";
import * as user from "../controllers/user";
import { verfiyAccessToken } from "../middleware/auth";

const router = express.Router();

router.get("/", user.getUsers);

export default router;
