import prisma from "../../../prisma";
import { StatusCode } from "../../enum/HttpStatus";
import { UID } from "../../interfaces/User.interface";
import API_Error from "../../utils/Api.error";
import CV_Service from "../Service/CV_Service.service";
import Recr_Service from "../Service/Recr_Service.service";
import User from "./User.service";

class User_ServiceUsing {
	static expiredTime(service_expired: string | any) {
		switch (service_expired) {
			case "No_limit":
				return 0;
			case "One_Week":
				return 7;
			case "Two_Week":
				return 14;
			case "One_Month":
				return 30;
			case "Three_Month":
				return 90;
			case "Six_Month":
				return 180;
			default:
				return 0;
		}
	}

	static async getByUserId(user_id: UID) {
		const service = await prisma.user_ServiceUsing.findFirst({ where: { user_id } });
		if (!service) throw new API_Error("User not using any service", StatusCode.NOT_FOUND);
	}

	static generateExpiredTime(service_expired: string | any) {
		const present = new Date().getTime();
		const calc = this.expiredTime(service_expired);
		const expired = calc !== 0 ? new Date(present + calc * 24 * 60 * 60 * 1000).toISOString() : service_expired;
		return expired;
	}

	static async addFreeTrial(user_id: UID) {
		this.UserRegisService(user_id, 1);
	}

	static async RegisCvService(user_id: UID, service_id: number) {
		const service = await CV_Service.get(service_id);
		const { cv_service_expired } = service;
		if (cv_service_expired) {
			const expiredAt = this.generateExpiredTime(cv_service_expired);
			const regis = await prisma.user_ServiceUsing.create({
				data: {
					user_id,
					cv_service_id: service_id,
					expiredAt,
				},
			});
		}
	}

	static async RegisRecrService(user_id: UID, service_id: number) {
		const service = await Recr_Service.get(service_id);
		const { recr_service_expired } = service;
		if (recr_service_expired) {
			const expiredAt = this.generateExpiredTime(recr_service_expired);
			const regis = await prisma.user_ServiceUsing.create({
				data: {
					user_id,
					recr_service_id: service_id,
					expiredAt,
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
