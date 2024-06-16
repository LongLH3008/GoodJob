import { Request, Response } from "express";
import API_Response from "../utils/Api.response";
import CV from "../services/CV.service";
import CV_Import from "../services/CVimoprt.service";

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

	static async updateCv(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Update CV successfully",
			metadata: await CV.update(id, req.body),
		}).send(res);
	}

	static async deleteCv(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Update CV successfully",
			metadata: await CV.delete(id),
		}).send(res);
	}

	static async deleteCVByApplicant(req: Request, res: Response) {
		const { id, applicant_id } = req.params;
		return new API_Response({
			message: "Delete CV successfully",
			metadata: await CV.deleteByApplicantId(id, applicant_id),
		}).send(res);
	}

	static async getAllImportCv(req: Request, res: Response) {
		return new API_Response({
			message: "Get all CV successfully",
			metadata: await CV_Import.getAll(),
		}).send(res);
	}

	static async getImportCv(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Get all CV successfully",
			metadata: await CV_Import.get(id),
		}).send(res);
	}

	static async importCV(req: Request, res: Response) {
		return new API_Response({
			message: "Import CV successfully",
			metadata: await CV_Import.create(req.body),
		}).send(res);
	}

	static async deleteImportCv(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Delete all CV successfully",
			metadata: await CV_Import.delete(id),
		}).send(res);
	}

	static async deleteImportCVByApplicant(req: Request, res: Response) {
		const { id, applicant_id } = req.params;
		return new API_Response({
			message: "Delete CV successfully",
			metadata: await CV_Import.deleteByApplicantId(id, applicant_id),
		}).send(res);
	}

	static async updateImportCV(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Update CV successfully",
			metadata: await CV_Import.update(id, req.body),
		}).send(res);
	}

	static async turnOnRecommended(req: Request, res: Response) {
		const { id, applicant_id } = req.params;
		return new API_Response({
			message: "Update CV successfully",
			metadata: await CV.recommended(id, applicant_id),
		}).send(res);
	}

	static async turnOffRecommended(req: Request, res: Response) {
		const { id, applicant_id } = req.params;
		return new API_Response({
			message: "Update CV successfully",
			metadata: await CV.notRecommended(id, applicant_id),
		}).send(res);
	}
}

export default CVController;
