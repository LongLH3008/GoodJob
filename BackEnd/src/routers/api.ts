import { Router } from "express";
import { Async } from "../utils/AsyncHandle";
import UserController from "../controllers/User.controller";
import ServiceController from "../controllers/Service.controller";
import ConversationController from "../controllers/Conversation.controller";
import CompanyController from "../controllers/Company.controller";
import ReviewController from "../controllers/Review.controller";
import CVController from "../controllers/CV.controller";

const router = Router();
// AUTH
router.post("/auth/register", Async(UserController.createUser));

// USER
router.get("/user", Async(UserController.getAllUser));
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

// CV
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

// CONVERSATION
router.get("/conversation", Async(ConversationController.getAllConversation));
router.get("/conversation/:id", Async(ConversationController.getConversation));
router.get("/conversation/:starter_userid/:partner_user_id", Async(ConversationController.getCoupleConversation));
router.get("/conversation/:user_id", Async(ConversationController.getUserConversation));
router.delete("/conversation/:id", Async(ConversationController.deleteConversation));
router.post("/conversation", Async(ConversationController.createConversation));

router.put("/conversation/message/status/:ref_message_id", Async(ConversationController.updateStatusMessage));
router.put("/conversation/message/:ref_message_id", Async(ConversationController.updateConversationMessage));
router.delete("/conversation/message/:ref_message_id", Async(ConversationController.deleteConversationMessage));

// COMPANY
router.get("/company", Async(CompanyController.getAllCompany));
router.post("/company", Async(CompanyController.createCompany));
router.get("/company/:id", Async(CompanyController.getCompany));
router.put("/company/:id", Async(CompanyController.updateCompany));
router.delete("/company/:id", Async(CompanyController.deleteCompany));

router.put("/company/check/:id", Async(CompanyController.checkCompany));
router.put("/company/uncheck/:id", Async(CompanyController.uncheckCompany));

// REVIEW
router.get("/review", Async(ReviewController.getAllReviews));
router.post("/review", Async(ReviewController.createReview));
router.get("/review/:id", Async(ReviewController.getReview));
router.put("/review/:id", Async(ReviewController.updateReview));
router.delete("/review/:id", Async(ReviewController.deleteReview));

router.get("/review/company/:company_id", Async(ReviewController.getCompanyReviews));
router.delete("/review/:applicant_id/:id", Async(ReviewController.deleteReviewByApplicant));

export default router;
