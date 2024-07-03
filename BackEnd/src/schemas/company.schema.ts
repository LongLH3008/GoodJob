import Joi from "joi";

export const CompanySchema = Joi.object({
	employer_id: Joi.string(),
	name: Joi.string().required().min(5).max(50),
	establish: Joi.string().required().max(4),
	address: Joi.string().required().min(10).max(200),
	avatar: Joi.string().allow(""),
	size: Joi.number().required().min(25).max(5000),
	business: Joi.string().required().max(50),
	introduce: Joi.string().required().max(1000),
	taxcode: Joi.string().required().max(13),
	license: Joi.string().required(),
});
