import { Router } from "express";
import UserRouter from "./user.routes";
import AuthRouter from "./auth.routes";
import ConversationRouter from "./conversation.routes";
import CVRouter from "./cv.routes";
import CompanyRouter from "./company.routes";
import RecruitmentRouter from "./recruitment.routes";
import RecrInfoRouter from "./recr_info.routes";
import NotificationRouter from "./notification.routes";

const router = Router();

router.use("/", UserRouter);
router.use("/", AuthRouter);
router.use("/", ConversationRouter);
router.use("/", CVRouter);
router.use("/", CompanyRouter);
router.use("/", RecruitmentRouter);
router.use("/", RecrInfoRouter);
router.use("/", NotificationRouter);

export default router;
