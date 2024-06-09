import { Router } from "express";
import { Async } from "../utils/AsyncHandle";
import CompanyController from "../controllers/Company.controller";
import ReviewController from "../controllers/Review.controller";

const router = Router();

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
