import { Request, Response } from "express";
import API_Response from "../utils/Api.response";
import CV from "../services/CV/CV.service";

class CVController {
	static async getAllCv(req: Request, res: Response) {
		return new API_Response({
			message: "Get all CV successfully",
			metadata: await CV.getAll(),
		}).send(res);
	}

	static async getCv(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Get CV successfully",
			metadata: await CV.get(id),
		}).send(res);
	}

	static async createCv(req: Request, res: Response) {
		return new API_Response({
			message: "Create CV successfully",
			metadata: await CV.create(req.body),
		}).send(res);
	}
}

export default CVController;
