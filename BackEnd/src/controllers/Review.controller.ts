import { Request } from "express";
import API_Response from "../utils/Api.response";
import Review from "../services/Review/Review.service";

class ReviewController {
	static async getAllReviews(req: Request, res: Response) {
		return new API_Response({
			message: "Get all reviews successfully",
			metadata: await Review.getAll(),
		}).send(res);
	}

	static async getReview(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Get review successfully",
			metadata: await Review.get(+id),
		}).send(res);
	}

	static async getCompanyReviews(req: Request, res: Response) {
		const { company_id } = req.params;
		return new API_Response({
			message: "Get reviews successfully",
			metadata: await Review.getReviewsByCompanyId(company_id),
		}).send(res);
	}

	static async deleteReview(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Delete review successfully",
			metadata: await Review.delete(+id),
		}).send(res);
	}

	static async deleteReviewByApplicant(req: Request, res: Response) {
		const { id, applicant_id } = req.params;
		return new API_Response({
			message: "Delete review successfully",
			metadata: await Review.deleteByApplicantId(+id, applicant_id),
		}).send(res);
	}

	static async createReview(req: Request, res: Response) {
		return new API_Response({
			message: "Create review successfully",
			metadata: await Review.create(req.body),
		}).send(res);
	}

	static async updateReview(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Update review successfully",
			metadata: await Review.update(+id, req.body),
		}).send(res);
	}
}

export default ReviewController;
