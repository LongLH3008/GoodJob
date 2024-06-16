import { Request, Response } from "express";
import API_Response from "../utils/Api.response";
import Notification from "../services/Notification.service";

class NotificationController {
	static async getAllNotifications(req: Request, res: Response) {
		return new API_Response({
			message: "Get all notifications successfully",
			metadata: await Notification.getAll(),
		}).send(res);
	}

	static async getAllNotificationsByUser(req: Request, res: Response) {
		const { user_id } = req.params;
		return new API_Response({
			message: "Get all notifications successfully",
			metadata: await Notification.getAllByUser(user_id),
		}).send(res);
	}

	static async getNotification(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Get notifications successfully",
			metadata: await Notification.get(+id),
		}).send(res);
	}

	static async deleteNotification(req: Request, res: Response) {
		const { id } = req.params;
		return new API_Response({
			message: "Delete notification successfully",
			metadata: await Notification.delete(+id),
		}).send(res);
	}

	static async deleteAllNotificationsByUser(req: Request, res: Response) {
		const { user_id } = req.params;
		return new API_Response({
			message: "Delete all notifications successfully",
			metadata: await Notification.deleteAllByUser(user_id),
		}).send(res);
	}

	static async createNotification(req: Request, res: Response) {
		const { user_id } = req.params;
		const { notif_status, content } = req.body;
		return new API_Response({
			message: "Create notifications successfully",
			metadata: await Notification.create(user_id, notif_status, content),
		}).send(res);
	}
}

export default NotificationController;
