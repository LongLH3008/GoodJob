import { Router } from "express";
import { Async } from "../utils/AsyncHandle";
import UserController from "../controllers/User.controller";

const router = Router();

router.post("/auth/register", Async(UserController.createUser));

export default router;
