import prisma from "../../prisma";
import { ReasonStatusCode, StatusCode } from "../enum/HttpStatus";
import { IUserInfo, TRegister, UID } from "../interfaces/User.interface";
import { RegisterSchema } from "../schemas/auth.schema";
import { ContactSchema, InfoSchema } from "../schemas/user.schema";
import { SchemaValidate } from "../schemas/validate";
import API_Error from "../utils/Api.error";
import { generateUUID } from "../utils/GenerateUUID";
import bcrypt from "bcryptjs";
import User_Contact from "./User_Contact.service";
import User_Info from "./User_Info.service";
import User_ServiceUsing from "./User_service_using.service";
import { generateIOSTime, generateLocaleTime } from "../utils/Time";

class User {
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
		});
		if (!user) throw new API_Error("User does not exist", StatusCode.NOT_FOUND);
		user.createAt = generateLocaleTime(user.createAt);
		user.updateAt = user.updateAt == null ? null : generateLocaleTime(user.updateAt);
		const [User_Contact, User_Information, User_Social, User_ServiceUsing] = await prisma.$transaction([
			prisma.user_Contact.findFirst({ where: { user_id: id } }),
			prisma.user_Information.findFirst({ where: { user_id: id } }),
			prisma.user_Social.findMany({ where: { user_id: id } }),
			prisma.user_ServiceUsing.findFirst({
				where: { user_id: id },
				include: { CV_Services: true, Recruitment_Services: true },
			}),
		]);
		return {
			...user,
			User_Contact,
			User_Information,
			User_Social,
			User_ServiceUsing,
		};
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
		const { city, district, detail_address, phone, avatar, name, birth, gender, company_role } = dt;
		SchemaValidate(ContactSchema, { city, district, detail_address, phone });
		SchemaValidate(InfoSchema, { avatar, name, birth, gender, company_role });
		await this.get(user_id);
		const newInfo = await User_Info.createByUserId(user_id, { avatar, name, birth, gender, company_role });
		const newContact = await User_Contact.createByUserId(user_id, { city, district, detail_address, phone });
		this.check(user_id);
		await Promise.all([
			User_ServiceUsing.addFreeTrial(user_id),
			prisma.user.update({
				where: { id: user_id },
				data: {
					updateAt: generateIOSTime(),
				},
			}),
		]);
		return { newInfo, newContact };
	}

	static async updateInfo(user_id: UID, dt: any) {
		const { city, district, detail_address, phone, avatar, name, birth, gender, company_role } = dt;
		SchemaValidate(ContactSchema, { city, district, detail_address, phone });
		SchemaValidate(InfoSchema, { avatar, name, birth, gender, company_role });
		await Promise.all([
			this.get(user_id),
			User_Contact.getByUserId(user_id),
			User_Info.getByUserId(user_id),
			prisma.user.update({
				where: { id: user_id },
				data: {
					updateAt: generateIOSTime(),
				},
			}),
		]);
		const newInfo = await User_Info.updateByUserId(user_id, { avatar, name, birth, gender, company_role });
		const newContact = await User_Contact.updateByUserId(user_id, { city, district, detail_address, phone });
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
