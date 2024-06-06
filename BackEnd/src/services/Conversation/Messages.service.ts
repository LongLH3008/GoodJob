import prisma from "../../../prisma";
import { StatusCode } from "../../enum/HttpStatus";
import { UID } from "../../interfaces/User.interface";
import API_Error from "../../utils/Api.error";
import Conversation from "./Conversation.service";

class Conversation_Messages {
	static async create(sender_id: UID, conversation_id: number, ref_message_id: string, content: string) {
		return await prisma.conversation_Messages.create({
			data: {
				sender_id,
				ref_message_id,
				conversation_id,
				content,
			},
		});
	}

	static async get(ref_message_id: any) {
		const mesage = await prisma.conversation_Messages.findFirst({
			where: {
				ref_message_id,
			},
		});
		if (!mesage) throw new API_Error("This message does not exist", StatusCode.NOT_FOUND);
		return mesage;
	}

	static async updateStatus(ref_message_id: string) {
		await this.get(ref_message_id);
		return await prisma.conversation_Messages.updateMany({
			where: {
				ref_message_id,
			},
			data: {
				message_status: "Seen",
			},
		});
	}

	static async update(ref_message_id: string, dt: any) {
		await this.get(ref_message_id);
		const { content } = dt;
		return await prisma.conversation_Messages.updateMany({
			where: {
				ref_message_id,
			},
			data: {
				content,
			},
		});
	}

	static async delete(ref_message_id: string) {
		await this.get(ref_message_id);
		return await prisma.conversation_Messages.deleteMany({
			where: {
				ref_message_id,
			},
		});
	}
}

export default Conversation_Messages;
