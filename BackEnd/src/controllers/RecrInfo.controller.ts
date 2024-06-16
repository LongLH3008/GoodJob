import { Request, Response } from "express";
import API_Response from "../utils/Api.response";
import RecrInfo from "../services/RecrInfo.service";
import { UID } from "../interfaces/User.interface";
import { recr_info_status_t } from "@prisma/client";

class RecrInfoController {
	static async getAllRecrInfo(req: Request, res: Response) {
		return new API_Response({
			message: "Get all recr info successfully",
			metadata: await RecrInfo.getAll(),
		}).send(res);
	}

	static async getRecrInfo(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Get recr info successfully",
			metadata: await RecrInfo.get(+id),
		}).send(res);
	}

	static async createRecrInfo(req: Request, res: Response) {
		const { cv_id, recr_id, options } = req.params;
		return new API_Response({
			message: "Create recr info successfully",
			metadata: await RecrInfo.create(cv_id, recr_id, options as "import" | "create"),
		}).send(res);
	}

	static async updateRecrInfo(req: Request, res: Response) {
		const { id, employer_id, action } = req.params;
		return new API_Response({
			message: "Update recr info successfully",
			metadata: await RecrInfo.update(employer_id, +id, action as recr_info_status_t),
		}).send(res);
	}
}

export default RecrInfoController;
