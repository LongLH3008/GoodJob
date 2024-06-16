import { Router } from "express";
import { Async } from "../utils/AsyncHandle";
import NotificationController from "../controllers/Notification.controller";

const router = Router();

router.get("/notif", Async(NotificationController.getAllNotifications));
router.get("/notif/:id", Async(NotificationController.getNotification));
router.get("/notif/all/:user_id", Async(NotificationController.getAllNotificationsByUser));

router.post("/notif/:user_id", Async(NotificationController.createNotification));

router.delete("/notif/:id", Async(NotificationController.deleteNotification));
router.delete("/notif/all/:user_id", Async(NotificationController.deleteAllNotificationsByUser));

export default router;
