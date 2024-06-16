import { Request, Response } from "express";
import CV_Service from "../services/Service_Cv.service";
import Recr_Service from "../services/Service_Recr.service";
import API_Response from "../utils/Api.response";

class ServiceController {
	static async getAllServices(req: Request, res: Response) {
		return new API_Response({
			message: "Get all services successfully",
			metadata: {
				cv: await CV_Service.getAll(),
				recr: await Recr_Service.getAll(),
			},
		}).send(res);
	}

	static async getCvService(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Get service successfully",
			metadata: await CV_Service.get(id),
		}).send(res);
	}

	static async createCvService(req: Request, res: Response) {
		return new API_Response({
			message: "Create service successfully",
			metadata: await CV_Service.create(req.body),
		}).send(res);
	}

	static async updateCvService(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Update service successfully",
			metadata: await CV_Service.update(id, req.body),
		}).send(res);
	}

	static async deleteCvService(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Delete service successfully",
			metadata: await CV_Service.delete(id),
		}).send(res);
	}

	static async getRecrService(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Get service successfully",
			metadata: await Recr_Service.get(id),
		}).send(res);
	}

	static async createRecrService(req: Request, res: Response) {
		return new API_Response({
			message: "Create service successfully",
			metadata: await Recr_Service.create(req.body),
		}).send(res);
	}

	static async updateRecrService(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Update service successfully",
			metadata: await Recr_Service.update(id, req.body),
		}).send(res);
	}

	static async deleteRecrService(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Delete service successfully",
			metadata: await Recr_Service.delete(id),
		}).send(res);
	}
}

export default ServiceController;
