import { Router } from "express";
import { Async } from "../utils/AsyncHandle";
import CVController from "../controllers/CV.controller";

const router = Router();

router.get("/cv", Async(CVController.getAllCv));
router.post("/cv", Async(CVController.createCv));
router.get("/cv/:id", Async(CVController.getCv));
router.put("/cv/:id", Async(CVController.updateCv));
router.delete("/cv/:id", Async(CVController.deleteCv));
router.delete("/cv/:applicant_id/:id", Async(CVController.deleteCVByApplicant));

router.put("/cv/recommended/on/:applicant_id/:id", Async(CVController.turnOnRecommended));
router.put("/cv/recommended/off/:applicant_id/:id", Async(CVController.turnOffRecommended));

router.get("/cv_import", Async(CVController.getAllImportCv));
router.post("/cv_import", Async(CVController.importCV));
router.get("/cv_import/:id", Async(CVController.getImportCv));
router.put("/cv_import/:id", Async(CVController.updateImportCV));
router.delete("/cv_import/:id", Async(CVController.deleteImportCv));
router.delete("/cv_import/:applicant_id/:id", Async(CVController.deleteImportCVByApplicant));

export default router;
