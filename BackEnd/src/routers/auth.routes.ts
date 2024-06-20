import { Router } from "express";
import { Async } from "../utils/AsyncHandle";
import AuthController from "../controllers/Auth.controller";

const router = Router();

router.post("/auth/login", Async(AuthController.Login));
router.post("/auth/register", Async(AuthController.Register));
router.get("/auth/logout", Async(AuthController.Logout));

export default router;
