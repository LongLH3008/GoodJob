import { Request, Response } from "express";
import API_Response from "../utils/Api.response";
import Recruitment from "../services/Recruitment/Recruitment.service";

class RecruitmentController {
	static async getAllRecruitments(req: Request, res: Response) {
		return new API_Response({
			message: "Get recruitments successfully",
			metadata: await Recruitment.getAll(),
		}).send(res);
	}

	static async getRecruitment(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Get recruitment successfully",
			metadata: await Recruitment.get(id),
		}).send(res);
	}

	static async deleteRecruitment(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Delete recruitment successfully",
			metadata: await Recruitment.delete(id),
		}).send(res);
	}

	static async deleteRecruitmentByEmployer(req: Request, res: Response) {
		const { id, employer_id, company_id } = req.params;
		return new API_Response({
			message: "Delete recruitment successfully",
			metadata: await Recruitment.deleteByEmployer(id, employer_id, company_id),
		}).send(res);
	}

	static async createRecruitment(req: Request, res: Response) {
		return new API_Response({
			message: "Create recruitment successfully",
			metadata: await Recruitment.create(req.body),
		}).send(res);
	}

	static async updateRecruitment(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Update recruitment successfully",
			metadata: await Recruitment.update(id, req.body),
		}).send(res);
	}

	static async turnOnRecrRecommended(req: Request, res: Response) {
		const { id, employer_id, company_id } = req.params;
		return new API_Response({
			message: "Update recruitment successfully",
			metadata: await Recruitment.recommended(id, employer_id, company_id),
		}).send(res);
	}

	static async turnOffRecrRecommended(req: Request, res: Response) {
		const { id, employer_id, company_id } = req.params;
		return new API_Response({
			message: "Update recruitment successfully",
			metadata: await Recruitment.notRecommended(id, employer_id, company_id),
		}).send(res);
	}
}

export default RecruitmentController;
