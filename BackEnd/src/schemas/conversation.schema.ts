import Joi from "joi";

export const ConversationSchema = Joi.object({
	starter_userid: Joi.string().required(),
	partner_userid: Joi.string().required(),
	content: Joi.string().required().max(255),
});
