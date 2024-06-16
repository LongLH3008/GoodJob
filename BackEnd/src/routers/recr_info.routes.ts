import { Router } from "express";
import { Async } from "../utils/AsyncHandle";
import RecrInfoController from "../controllers/RecrInfo.controller";

const router = Router();

router.get("/recr_info", Async(RecrInfoController.getAllRecrInfo));
router.get("/recr_info/:id", Async(RecrInfoController.getRecrInfo));
router.post("/recr_info/:cv_id/:recr_id/:options", Async(RecrInfoController.createRecrInfo));

router.put("/recr_info/:id/:employer_id/:action", Async(RecrInfoController.updateRecrInfo));

export default router;
