import { Router } from "express";
import { Async } from "../utils/AsyncHandle";
import ConversationController from "../controllers/Conversation.controller";

const router = Router();

router.get("/conversation", Async(ConversationController.getAllConversation));
router.get("/conversation/:id", Async(ConversationController.getConversation));
router.get("/conversation/:starter_userid/:partner_user_id", Async(ConversationController.getCoupleConversation));
router.get("/conversation/:user_id", Async(ConversationController.getUserConversation));
router.delete("/conversation/:id", Async(ConversationController.deleteConversation));
router.post("/conversation", Async(ConversationController.createConversation));

router.put("/conversation/message/status/:ref_message_id", Async(ConversationController.updateStatusMessage));
router.put("/conversation/message/:ref_message_id", Async(ConversationController.updateConversationMessage));
router.delete("/conversation/message/:ref_message_id", Async(ConversationController.deleteConversationMessage));

export default router;
