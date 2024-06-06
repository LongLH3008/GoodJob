import Joi from "joi";

const UserRoleEnum = ["Administrator", "Applicant", "Employer"];

export const LoginSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().min(6).max(32).required().pattern(new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{6,}$")),
});

export const RegisterSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().min(6).max(32).required().pattern(new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{6,}$")),
	confirmpassword: Joi.string().valid(Joi.ref("password")).required(),
	user_role: Joi.string()
		.valid(...UserRoleEnum)
		.required(),
});
