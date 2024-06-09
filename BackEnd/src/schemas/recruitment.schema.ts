import Joi from "joi";

const formatEnum = ["FullTime", "PartTime", "Remote", "Freelance", "Contract", "Temporary", "Internship"];

export const RecruitmentSchema = Joi.object({
	employer_id: Joi.string().required(),
	company_id: Joi.string().required(),
	job: Joi.string().required(),
	position: Joi.string().required(),
	exp: Joi.number().required(),
	salary: Joi.string().required().max(30),
	benefits: Joi.string().allow(""),
	describe: Joi.string().allow(""),
	end: Joi.string().required(),
	work_format: Joi.any()
		.valid(...formatEnum)
		.required(),
});
