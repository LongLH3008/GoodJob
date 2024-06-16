import prisma from "../../prisma";
import { StatusCode } from "../enum/HttpStatus";
import { UID } from "../interfaces/User.interface";
import API_Error from "../utils/Api.error";

class User_Info {
	static async getByUserId(user_id: UID) {
		const contact = await prisma.user_Social.findMany({ where: { user_id } });
		if (!contact) throw new API_Error("Cannot found User information", StatusCode.NOT_FOUND);
		return contact;
	}
}

export default User_Info;
