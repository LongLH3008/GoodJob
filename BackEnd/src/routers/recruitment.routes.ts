import { Router } from "express";
import RecruitmentController from "../controllers/Recruitment.controller";
import { Async } from "../utils/AsyncHandle";

const router = Router();

router.get("/recr", Async(RecruitmentController.getAllRecruitments));
router.post("/recr", Async(RecruitmentController.createRecruitment));
router.get("/recr/:id", Async(RecruitmentController.getRecruitment));
router.put("/recr/:id", Async(RecruitmentController.updateRecruitment));
router.delete("/recr/:id", Async(RecruitmentController.deleteRecruitment));
router.delete("/recr/:employer_id/:company_id/:id", Async(RecruitmentController.deleteRecruitmentByEmployer));

router.put("/recr/recommended/on/:employer_id/:company_id/:id", Async(RecruitmentController.turnOnRecrRecommended));
router.put("/recr/recommended/off/:employer_id/:company_id/:id", Async(RecruitmentController.turnOffRecrRecommended));

export default router;
