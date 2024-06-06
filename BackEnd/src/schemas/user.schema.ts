import Joi from "joi";

const genderEnum = ["Male", "Female"];
const roleEnum = ["Employee", "Department Manager", "Director", "CEO"];

export const InfoSchema = Joi.object({
	// Info
	avatar: Joi.string().allow(""),
	name: Joi.string().min(3).max(30).required().required(),
	birth: Joi.any().required(),
	gender: Joi.string()
		.valid(...genderEnum)
		.required(),
	company_role: Joi.string()
		.valid(...roleEnum)
		.required(),
});

export const ContactSchema = Joi.object({
	// Contact
	city: Joi.string().required(),
	district: Joi.string().required(),
	detail_address: Joi.string().required(),
	phone: Joi.string()
		.pattern(/^[0-9]{10}$/)
		.required(),
});

export const SocialSchema = Joi.object({
	link: Joi.string().required(),
	social_type: Joi.string().valid("LinkedIn", "Facebook", "Twitter", "Insta").required(),
});
