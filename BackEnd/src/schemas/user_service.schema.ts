import Joi from "joi";

const ServiceSchema = Joi.object({
	name: Joi.string().required().max(30),
	price: Joi.number().required().min(10).max(5000),
	discount: Joi.number().required().min(0).max(100),
	describe: Joi.string().required(),
	recommended: Joi.number().required().min(0).max(10),
});

export const CV_ServiceSchema = ServiceSchema.keys({
	cv_service_expired: Joi.string().required(),
	totalCv: Joi.number().required().min(3).max(6),
});

export const Recr_ServiceSchema = ServiceSchema.keys({
	recr_service_expired: Joi.string().required(),
	totalRecr: Joi.number().required().min(3).max(6),
});
