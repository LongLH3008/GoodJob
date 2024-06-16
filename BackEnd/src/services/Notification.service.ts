import { notif_status_t } from "@prisma/client";
import prisma from "../../prisma";
import { StatusCode } from "../enum/HttpStatus";
import { UID } from "../interfaces/User.interface";
import API_Error from "../utils/Api.error";
import User from "./User.service";

class Notification {
	static async getAll() {
		const notifs = await prisma.notification.findMany({ include: { User: true } });
		if (!notifs.length) throw new API_Error("There are no notifications", StatusCode.NOT_FOUND);
		return notifs;
	}

	static async get(id: number) {
		const notif = await prisma.notification.findFirst({ where: { id }, include: { User: true } });
		if (!notif) throw new API_Error("Can not find notification", StatusCode.NOT_FOUND);
		return notif;
	}

	static async getAllByUser(user_id: UID) {
		const notifs = await prisma.notification.findMany({ where: { user_id } });
		if (!notifs.length) throw new API_Error("There are no notifications", StatusCode.NOT_FOUND);
		return notifs;
	}

	static async delete(id: number) {
		const [, result] = await Promise.all([this.get(id), prisma.notification.delete({ where: { id } })]);
		return result;
	}

	static async deleteAllByUser(user_id: UID) {
		const [, result] = await Promise.all([
			User.get(user_id),
			prisma.notification.deleteMany({ where: { user_id } }),
		]);
		return result;
	}

	static async create(user_id: UID, notif_status: notif_status_t, content: string) {
		return await prisma.notification.create({
			data: {
				user_id,
				notif_status,
				content,
			},
		});
	}
}

export default Notification;
