import { Router } from "express";
import UserController from "../controllers/User.controller";
import { Async } from "../utils/AsyncHandle";
import ServiceController from "../controllers/Service.controller";
import { checkAuth } from "../utils/Authorization";

const router = Router();

router.get("/user", checkAuth(UserController.getAllUser, ["Applicant"]));
router.get("/user/:id", Async(UserController.getUser));
router.delete("/user/:id", Async(UserController.deleteUser));

router.post("/user/info/:id", Async(UserController.createInfo));
router.put("/user/info/:id", Async(UserController.updateInfo));

router.put("/user/check/:id", Async(UserController.checkUser));
router.put("/user/uncheck/:id", Async(UserController.uncheckUser));

// USER_SERVICE
router.get("/service", Async(ServiceController.getAllServices));

router.get("/cv_service/:id", Async(ServiceController.getCvService));
router.post("/cv_service", Async(ServiceController.createCvService));
router.put("/cv_service/:id", Async(ServiceController.updateCvService));
router.delete("/cv_service/:id", Async(ServiceController.deleteCvService));

router.get("/recr_service/:id", Async(ServiceController.getRecrService));
router.post("/recr_service", Async(ServiceController.createRecrService));
router.put("/recr_service/:id", Async(ServiceController.updateRecrService));
router.delete("/recr_service/:id", Async(ServiceController.deleteRecrService));

export default router;
