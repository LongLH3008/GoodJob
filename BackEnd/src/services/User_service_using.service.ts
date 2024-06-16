import prisma from "../../prisma";
import { StatusCode } from "../enum/HttpStatus";
import { UID } from "../interfaces/User.interface";
import API_Error from "../utils/Api.error";
import CV_Service from "./Service_Cv.service";
import Recr_Service from "./Service_Recr.service";
import User from "./User.service";

class User_ServiceUsing {
	static expiredTime(service_expired: any) {
		const present = new Date();
		let future;

		switch (service_expired) {
			case "One_Week":
				future = new Date(present);
				future.setDate(future.getDate() + 7);
				return future;
			case "Two_Week":
				future = new Date(present);
				future.setDate(future.getDate() + 14);
				return future;
			case "One_Month":
				future = new Date(present);
				future.setMonth(future.getMonth() + 1);
				return future;
			case "Three_Month":
				future = new Date(present);
				future.setMonth(future.getMonth() + 3);
				return future;
			case "Six_Month":
				future = new Date(present);
				future.setMonth(future.getMonth() + 6);
				return future;
			default:
				return null;
		}
	}

	static async getByUserId(user_id: UID) {
		const service = await prisma.user_ServiceUsing.findFirst({ where: { user_id } });
		if (!service) throw new API_Error("User not using any service", StatusCode.NOT_FOUND);
	}

	static async addFreeTrial(user_id: UID) {
		this.UserRegisService(user_id, 1);
	}

	static async RegisCvService(user_id: UID, service_id: number) {
		const service = await CV_Service.get(service_id);
		if (!service) throw new API_Error("Cv Service not found", StatusCode.NOT_FOUND);
		const { cv_service_expired } = service;
		if (cv_service_expired) {
			await prisma.user_ServiceUsing.create({
				data: {
					user_id,
					cv_service_id: service_id,
					expiredTime: this.expiredTime(cv_service_expired),
				},
			});
		}
	}

	static async RegisRecrService(user_id: UID, service_id: number) {
		const service = await Recr_Service.get(service_id);
		if (!service) throw new API_Error("Recr Service not found", StatusCode.NOT_FOUND);
		const { recr_service_expired } = service;
		if (recr_service_expired) {
			const expiredTime = this.expiredTime(recr_service_expired);
			console.log(expiredTime);

			await prisma.user_ServiceUsing.create({
				data: {
					user_id,
					recr_service_id: service_id,
					expiredTime,
				},
			});
		}
	}

	static async UserRegisService(user_id: UID, service_id: number) {
		const user = await User.get(user_id);
		const { user_role } = user;
		if (user_role == "Applicant") this.RegisCvService(user_id, service_id);
		if (user_role == "Employer") this.RegisRecrService(user_id, service_id);
	}
}

export default User_ServiceUsing;
