import { Request, Response } from "express";
import API_Response from "../utils/Api.response";
import Conversation from "../services/Conversation/Conversation.service";
import Conversation_Messages from "../services/Conversation/Messages.service";

class ConversationController {
	static async getAllConversation(req: Request, res: Response) {
		return new API_Response({
			message: "Get all conversation successfully",
			metadata: await Conversation.getAll(),
		}).send(res);
	}

	static async getConversation(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Get conversation successfully",
			metadata: await Conversation.get(id),
		}).send(res);
	}

	static async deleteConversation(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Delete conversation successfully",
			metadata: await Conversation.delete(id),
		}).send(res);
	}

	static async getCoupleConversation(req: Request, res: Response) {
		const { starter_userid, partner_user_id } = req.params;
		return new API_Response({
			message: "Get conversation successfully",
			metadata: await Conversation.getByCoupleUser(starter_userid, partner_user_id),
		}).send(res);
	}

	static async getUserConversation(req: Request, res: Response) {
		const { user_id } = req.params;
		return new API_Response({
			message: "Get conversation successfully",
			metadata: await Conversation.getByUser(user_id),
		}).send(res);
	}

	static async updateConversationMessage(req: Request, res: Response) {
		const { ref_message_id } = req.params;
		return new API_Response({
			message: "Update message successfully",
			metadata: await Conversation_Messages.update(ref_message_id, req.body),
		}).send(res);
	}

	static async updateStatusMessage(req: Request, res: Response) {
		const { ref_message_id } = req.params;
		return new API_Response({
			message: "Update message successfully",
			metadata: await Conversation_Messages.updateStatus(ref_message_id),
		}).send(res);
	}

	static async deleteConversationMessage(req: Request, res: Response) {
		const { ref_message_id } = req.params;
		return new API_Response({
			message: "Delete message successfully",
			metadata: await Conversation_Messages.delete(ref_message_id),
		}).send(res);
	}

	static async createConversation(req: Request, res: Response) {
		return new API_Response({
			message: "Create conversation successfully",
			metadata: await Conversation.sendMessage(req.body),
		}).send(res);
	}
}

export default ConversationController;
