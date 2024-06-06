import prisma from "../../../prisma";
import { ReasonStatusCode, StatusCode } from "../../enum/HttpStatus";
import { IUserInfo, TRegister, UID } from "../../interfaces/User.interface";
import { RegisterSchema } from "../../schemas/auth.schema";
import { ContactSchema, InfoSchema } from "../../schemas/user.schema";
import { SchemaValidate } from "../../schemas/validate";
import API_Error from "../../utils/Api.error";
import { generateUUID } from "../../utils/GenerateUUID";
import bcrypt from "bcryptjs";
import User_Contact from "./User_Contact.service";
import User_Info from "./User_Info.service";
import User_ServiceUsing from "./User_service_using.service";

class User {
	private static async updateTime(id: UID) {
		return await prisma.user.update({
			where: { id },
			data: { id },
		});
	}
	static async getAll() {
		const users = await prisma.user.findMany();
		if (!users) throw new API_Error(ReasonStatusCode.NOT_FOUND, StatusCode.NOT_FOUND);
		return users;
	}

	static async get(id: UID) {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				email: true,
				user_status: true,
				user_role: true,
				user_type: true,
				check: true,
				User_Contact: {
					select: {
						city: true,
						district: true,
						detail_address: true,
						phone: true,
					},
				},

				User_Information: {
					select: {
						avatar: true,
						name: true,
						birth: true,
						gender: true,
						company_role: true,
					},
				},
				User_Social: true,
				User_ServiceUsing: {
					select: {
						recr_service_id: true,
						cv_service_id: true,
						expiredAt: true,
						CV_Services: {
							select: {
								name: true,
								describe: true,
								totalCv: true,
								recommended: true,
							},
						},
						Recruitment_Services: {
							select: {
								name: true,
								describe: true,
								totalRecr: true,
								recommended: true,
							},
						},
					},
				},
				Conversation_Conversation_starter_useridToUser: {
					include: {
						Conversation_Messages: true,
					},
				},
				CV_import: true,
				CV: true,
				Notification: true,
				Order: true,
				Company: true,
				Reviews: true,
			},
		});
		if (!user) throw new API_Error("User does not exist", StatusCode.NOT_FOUND);
		return user;
	}

	static async create(dt: TRegister) {
		const { email, password, user_role } = dt;
		SchemaValidate(RegisterSchema, dt);
		const isExist = await prisma.user.findFirst({
			where: {
				email,
			},
		});
		if (isExist) throw new API_Error("User already exists", StatusCode.UNAUTHORIZED);
		const hash = await bcrypt.hash(password, 10);
		const newUser = await prisma.user.create({
			data: {
				id: generateUUID(),
				email,
				check: "0",
				password: hash,
				user_role,
			},
		});
		return newUser;
	}

	static async changePassword(dt: TRegister, id: UID) {
		await this.get(id);
		const { password } = dt;
		SchemaValidate(RegisterSchema, dt);
		const hash = await bcrypt.hash(password, 10);
		const newUser = await prisma.user.update({
			where: {
				id,
			},
			data: {
				password: hash,
			},
		});
		return newUser;
	}

	static async delete(id: UID) {
		const user = this.get(id);
		if (!user) throw new API_Error("User not found", StatusCode.NOT_FOUND);
		const removeUser = await prisma.user.delete({ where: { id } });
		return removeUser;
	}

	static async createInfo(user_id: UID, dt: IUserInfo) {
		await this.get(user_id);
		const newInfo = await User_Contact.createByUserId(user_id, dt);
		const newContact = await User_Info.createByUserId(user_id, dt);
		this.check(user_id);
		await User_ServiceUsing.addFreeTrial(user_id);
		return { newInfo, newContact };
	}

	static async updateInfo(user_id: UID, dt: any) {
		const user = await this.get(user_id);
		await User_Contact.getByUserId(user_id);
		await User_Info.getByUserId(user_id);
		const newContact = await User_Contact.updateByUserId(user_id, dt);
		const newInfo = await User_Info.updateByUserId(user_id, dt);
		this.updateTime(user_id);
		return { newInfo, newContact };
	}

	static async uncheck(id: UID) {
		await Promise.all([this.get(id), prisma.user.update({ where: { id }, data: { check: "0" } })]);
		return true;
	}

	static async check(id: UID) {
		await Promise.all([this.get(id), prisma.user.update({ where: { id }, data: { check: "1" } })]);
		return true;
	}
}

export default User;
