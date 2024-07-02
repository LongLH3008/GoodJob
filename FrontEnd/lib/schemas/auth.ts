import Joi from "joi";

export const loginValidate = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			"any.required": "(*) Email required",
			"string.email": "Email invalid",
			"string.empty": "Email is not allow empty string",
		}),
	password: Joi.string().min(6).required().messages({
		"any.required": "(*) Password required",
		"string.min": "Password at least 6 characters",
		"string.empty": "Password is not allow empty string",
	}),
});

export const registerValidate = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			"any.required": "(*) Email required",
			"string.email": "Email invalid",
			"string.empty": "Email is not allow empty string",
		}),
	password: Joi.string()
		.min(6)
		.max(32)
		.required()
		.pattern(new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{6,}$"))
		.messages({
			"any.required": "(*) Password required",
			"string.min": "Password at least 6 characters",
			"string.max": "Password at most 32 characters",
			"string.pattern.base": "At least 1 uppercase, 1 digit, and 1 special",
			"string.empty": "Password is not allow empty string",
		}),
	confirmpassword: Joi.string().valid(Joi.ref("password")).messages({
		"any.only": "Password not match",
	}),
	user_role: Joi.string().valid("Applicant", "Employer").required().messages({
		"any.required": "(*) You must choose your role",
		"string.only": "Role invalid",
	}),
});
