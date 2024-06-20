import { Request, Response } from "express";
import API_Response from "../utils/Api.response";
import Auth from "../services/Auth.service";

class AuthController {
	static async Login(req: Request, res: Response) {
		return new API_Response({
			message: "Login successfully",
			metadata: await Auth.Login(req.body, res, req),
		}).send(res);
	}

	static async Register(req: Request, res: Response) {
		return new API_Response({
			message: "Register success",
			metadata: await Auth.Register(req.body),
		}).send(res);
	}

	static async Logout(req: Request, res: Response) {
		return new API_Response({
			message: "Logout success",
			metadata: await Auth.Logout(res, req),
		}).send(res);
	}
}

export default AuthController;
