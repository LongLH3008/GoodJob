import prisma from "../../../prisma";
import { StatusCode } from "../../enum/HttpStatus";
import { UID } from "../../interfaces/User.interface";
import { ContactSchema } from "../../schemas/user.schema";
import { SchemaValidate } from "../../schemas/validate";
import API_Error from "../../utils/Api.error";

class User_Contact {
	static async getByUserId(user_id: UID) {
		const contact = await prisma.user_Contact.findFirst({ where: { user_id } });
		if (!contact) throw new API_Error("Cannot found User contact", StatusCode.NOT_FOUND);
		return contact;
	}

	static async createByUserId(user_id: UID, dt: any) {
		const isExist = await prisma.user_Contact.findFirst({ where: { user_id } });
		if (isExist) throw new API_Error("This user already have information", StatusCode.UNAUTHORIZED);
		const { city, district, detail_address, phone } = dt;
		SchemaValidate(ContactSchema, { city, district, detail_address, phone });
		return await prisma.user_Contact.create({
			data: {
				user_id,
				city,
				district,
				detail_address,
				phone,
			},
		});
	}

	static async updateByUserId(user_id: UID, dt: any) {
		const contact = await this.getByUserId(user_id);
		const { city, district, detail_address, phone } = dt;
		const { id } = contact;
		SchemaValidate(ContactSchema, { city, district, detail_address, phone });
		return await prisma.user_Contact.update({
			where: {
				id,
				user_id,
			},
			data: {
				city,
				district,
				detail_address,
				phone,
			},
		});
	}
}

export default User_Contact;
