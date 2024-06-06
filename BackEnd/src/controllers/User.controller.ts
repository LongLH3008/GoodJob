import { Request, Response } from "express";
import User from "../services/User/User.service";
import API_Response from "../utils/Api.response";

class UserController {
	static async createUser(req: Request, res: Response) {
		return new API_Response({
			message: "Create User Success",
			metadata: await User.create(req.body),
		}).send(res);
	}
	static async getAllUser(req: Request, res: Response): Promise<any> {
		return new API_Response({
			message: "Get Users Successfully",
			metadata: await User.getAll(),
		}).send(res);
	}
	static async getUser(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Get User Successfully",
			metadata: await User.get(id),
		}).send(res);
	}
	static async createInfo(req: Request, res: Response) {
		const user_id = req.params.id;
		return new API_Response({
			message: "Update Info user Successfully",
			metadata: await User.createInfo(user_id, req.body),
		}).send(res);
	}
	static async updateInfo(req: Request, res: Response) {
		const user_id = req.params.id;
		return new API_Response({
			message: "Create Info user Successfully",
			metadata: await User.updateInfo(user_id, req.body),
		}).send(res);
	}
	static async deleteUser(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Delete User Successfully",
			metadata: await User.delete(id),
		}).send(res);
	}
	static async uncheckUser(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Uncheck User successfully",
			metadata: await User.uncheck(id),
		}).send(res);
	}

	static async checkUser(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Check User successfully",
			metadata: await User.check(id),
		}).send(res);
	}
}
export default UserController;
