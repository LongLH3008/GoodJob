import prisma from "../../prisma";
import { StatusCode } from "../enum/HttpStatus";
import { UID } from "../interfaces/User.interface";
import { ContactSchema } from "../schemas/user.schema";
import { SchemaValidate } from "../schemas/validate";
import API_Error from "../utils/Api.error";

class User_Contact {
	static async getByUserId(user_id: UID) {
		const contact = await prisma.user_Contact.findFirst({ where: { user_id } });
		if (!contact) throw new API_Error("Cannot found User contact", StatusCode.NOT_FOUND);
		return contact;
	}

	static async createByUserId(user_id: UID, dt: any) {
		const isExist = await prisma.user_Contact.findFirst({ where: { user_id } });
		if (isExist) throw new API_Error("This user already have information", StatusCode.UNAUTHORIZED);
		return await prisma.user_Contact.create({
			data: { user_id, ...dt },
		});
	}

	static async updateByUserId(user_id: UID, dt: any) {
		const isExist = await prisma.user_Contact.findFirst({ where: { user_id } });
		if (!isExist) throw new API_Error("Contact not found", StatusCode.UNAUTHORIZED);
		return await prisma.user_Contact.update({
			where: { user_id, id: isExist.id },
			data: { user_id, ...dt },
		});
	}
}

export default User_Contact;
