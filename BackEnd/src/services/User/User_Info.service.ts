import prisma from "../../../prisma";
import { StatusCode } from "../../enum/HttpStatus";
import { UID } from "../../interfaces/User.interface";
import { InfoSchema } from "../../schemas/user.schema";
import { SchemaValidate } from "../../schemas/validate";
import API_Error from "../../utils/Api.error";

class User_Info {
	static async getByUserId(user_id: UID) {
		const info = await prisma.user_Information.findFirst({ where: { user_id } });
		if (!info) throw new API_Error("Cannot found User information", StatusCode.NOT_FOUND);
		if (info && info.birth) {
			const reverseBirth = info.birth.split("-").reverse().join("/");
			info.birth = reverseBirth;
		}
		return info;
	}

	static async createByUserId(user_id: UID, dt: any) {
		const isExist = await prisma.user_Information.findFirst({ where: { user_id } });
		if (isExist) throw new API_Error("This user already have information", StatusCode.UNAUTHORIZED);
		const { avatar, name, birth, gender, company_role } = dt;
		SchemaValidate(InfoSchema, { avatar, name, birth, gender, company_role });
		return await prisma.user_Information.create({
			data: {
				user_id,
				avatar,
				name,
				birth,
				gender,
				company_role,
			},
		});
	}

	static async updateByUserId(user_id: UID, dt: any) {
		const info = await this.getByUserId(user_id);
		const { avatar, name, birth, gender, company_role } = dt;
		const { id } = info;
		SchemaValidate(InfoSchema, { avatar, name, birth, gender, company_role });
		return await prisma.user_Information.update({
			where: {
				id,
				user_id,
			},
			data: {
				avatar,
				name,
				birth,
				gender,
				company_role,
			},
		});
	}
}

export default User_Info;
