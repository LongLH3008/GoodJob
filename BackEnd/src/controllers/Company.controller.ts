import { Request, Response } from "express";
import Company from "../services/Company.service";
import API_Response from "../utils/Api.response";

class CompanyController {
	static async getAllCompany(req: Request, res: Response) {
		return new API_Response({
			message: "Get all company successfully",
			metadata: await Company.getAll(),
		}).send(res);
	}

	static async getCompany(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Get company successfully",
			metadata: await Company.get(id),
		}).send(res);
	}

	static async createCompany(req: Request, res: Response) {
		return new API_Response({
			message: "Create company successfully",
			metadata: await Company.create(req.body),
		}).send(res);
	}

	static async updateCompany(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Update company successfully",
			metadata: await Company.update(id, req.body),
		}).send(res);
	}

	static async deleteCompany(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Delete company successfully",
			metadata: await Company.get(id),
		}).send(res);
	}

	static async uncheckCompany(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Uncheck company successfully",
			metadata: await Company.uncheck(id),
		}).send(res);
	}

	static async checkCompany(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Check company successfully",
			metadata: await Company.check(id),
		}).send(res);
	}
}

export default CompanyController;
