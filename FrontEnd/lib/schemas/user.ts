import Joi from "joi";
const PhonePattern = /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-46-9])[0-9]{7}$/;
export const UserSchema = Joi.object({
	avatar: Joi.string().allow(""),
	name: Joi.string().required().min(5).max(30).messages({
		"any.empty": "Name is not allow empty",
		"string.required": "(*) Name is required",
		"string.min": "Name at least 5 characters",
		"string.max": "Name at most 30 characters",
	}),
	birth: Joi.any().required().messages({
		"any.empty": "Birth is not allow empty",
		"string.required": "(*) Birth is required",
	}),
	gender: Joi.string().valid("Male", "Female").required().messages({
		"any.empty": "Gender is not allow empty",
		"any.invalid": "Gender invalid",
		"string.required": "(*) Gender is required",
	}),
	company_role: Joi.string().valid("Employee", "Manager", "Director", "CEO").required().messages({
		"any.invalid": "Role invalid",
		"any.empty": "Role is not allow empty",
		"string.required": "(*) Role is required",
	}),
	city: Joi.string().required().messages({
		"any.empty": "City is not allow empty",
		"string.required": "(*) City is required",
	}),
	district: Joi.string().required().messages({
		"string.required": "(*) District is required",
	}),
	ward: Joi.string().required().messages({
		"string.required": "(*) Ward is required",
	}),
	detail_address: Joi.string().required().max(50).messages({
		"string.required": "(*) Detail address is required",
	}),
	phone: Joi.string().required().pattern(PhonePattern).messages({
		"any.empty": "Phone is not allow empty",
		"string.pattern.base": "Phone invalid",
		"string.required": "(*) Phone is required",
	}),
});
