import prisma from "../../prisma";
import { StatusCode } from "../enum/HttpStatus";
import { UID } from "../interfaces/User.interface";
import { ConversationSchema } from "../schemas/conversation.schema";
import { SchemaValidate } from "../schemas/validate";
import API_Error from "../utils/Api.error";
import { generateUUID } from "../utils/GenerateUUID";
import { generateIOSTime, generateLocaleTime } from "../utils/Time";
import User from "./User.service";
import Conversation_Messages from "./Conversation_Messages.service";

class Conversation {
	static async getAll() {
		const conversations = await prisma.conversation.findMany();
		if (!conversations.length) throw new API_Error("There are no conversations", StatusCode.NOT_FOUND);
		return conversations;
	}
	static async get(id: any) {
		const conversation = await prisma.conversation.findFirst({
			where: { id: +id },
			select: {
				starter_userid: true,
				partner_userid: true,
				Conversation_Messages: true,
				createAt: true,
				updateAt: true,
			},
		});
		if (!conversation) throw new API_Error("This conversation does not exist", StatusCode.NOT_FOUND);
		conversation.createAt = generateLocaleTime(conversation.createAt);
		conversation.updateAt = conversation.updateAt == null ? null : generateLocaleTime(conversation.updateAt);
		return conversation;
	}
	static async delete(id: any) {
		await this.get(id);
		return await prisma.conversation.delete({ where: { id: +id } });
	}
	static async create(dt: any) {
		const { starter_userid, partner_userid, ref_message_id, content, isPartner } = dt;
		SchemaValidate(ConversationSchema, { starter_userid, partner_userid, content });
		const newConversation = await prisma.conversation.create({
			data: {
				starter_userid: isPartner ? partner_userid : starter_userid,
				partner_userid: isPartner ? starter_userid : partner_userid,
			},
		});
		await Conversation_Messages.create(starter_userid, newConversation.id, ref_message_id, content);
		await prisma.conversation.update({
			where: { id: newConversation.id },
			data: { updateAt: generateIOSTime() },
		});
		return newConversation;
	}
	static async sendMessage(dt: any) {
		const { starter_userid, partner_userid, content } = dt;
		await Promise.all([User.get(starter_userid), User.get(partner_userid)]);
		const ref_message_id = generateUUID();
		const isPartner = true;
		const starter = await prisma.conversation.findFirst({
			where: { starter_userid, partner_userid },
		});
		const partner = await prisma.conversation.findFirst({
			where: { starter_userid: partner_userid, partner_userid: starter_userid },
		});
		if (starter && partner) {
			await Promise.all([
				Conversation_Messages.create(starter_userid, partner.id, ref_message_id, content),
				Conversation_Messages.create(starter_userid, starter.id, ref_message_id, content),
				prisma.conversation.updateMany({
					where: { AND: [{ id: partner.id }, { id: starter.id }] },
					data: { updateAt: generateIOSTime() },
				}),
			]);
		} else {
			if (!partner && !starter) {
				await Promise.all([
					await this.create({ ...dt, ref_message_id }),
					await this.create({ ...dt, ref_message_id, isPartner }),
				]);
			}
			if (starter) {
				await Promise.all([
					this.create({ ...dt, ref_message_id, isPartner }),
					Conversation_Messages.create(starter_userid, starter.id, ref_message_id, content),
					prisma.conversation.updateMany({
						where: { id: starter.id },
						data: { updateAt: generateIOSTime() },
					}),
				]);
			}
			if (partner) {
				await Promise.all([
					this.create({ ...dt, ref_message_id }),
					Conversation_Messages.create(starter_userid, partner.id, ref_message_id, content),
					prisma.conversation.updateMany({
						where: { id: partner.id },
						data: { updateAt: generateIOSTime() },
					}),
				]);
			}
		}
		return await this.getByUser(starter_userid);
	}
	static async getByUser(user_id: UID) {
		const conversation = await prisma.conversation.findFirst({
			where: { starter_userid: user_id },
			select: {
				id: true,
				starter_userid: true,
				partner_userid: true,
				createAt: true,
				Conversation_Messages: {
					select: {
						id: true,
						sender_id: true,
						content: true,
						message_status: true,
						ref_message_id: true,
					},
				},
			},
		});
		if (!conversation) throw new API_Error("This conversation does not exist", StatusCode.NOT_FOUND);
		return conversation;
	}
	static async getByCoupleUser(starter_userid: UID, partner_userid: UID) {
		const conversation = await prisma.conversation.findFirst({
			where: { starter_userid, partner_userid },
			select: {
				id: true,
				starter_userid: true,
				partner_userid: true,
				createAt: true,
				Conversation_Messages: {
					select: {
						id: true,
						sender_id: true,
						content: true,
						message_status: true,
						ref_message_id: true,
					},
				},
			},
		});
		if (!conversation) throw new API_Error("This conversation does not exist", StatusCode.NOT_FOUND);
		return conversation;
	}
	static async deleteByCoupleUser(starter_userid: UID, partner_userid: UID) {
		const { id } = await this.getByCoupleUser(starter_userid, partner_userid);
		if (id) {
			return await prisma.conversation.delete({ where: { id: +id, starter_userid, partner_userid } });
		}
	}
}

export default Conversation;
