import Joi from "joi";

const formatEnum = ["FullTime", "PartTime", "Remote", "Freelance", "Contract", "Temporary", "Other"];
const positionEnum = ["Employee", "Leader", "Monitoring", "Manager", "Director", "Intern", "Other"];
export const RecruitmentSchema = Joi.object({
	employer_id: Joi.string().required(),
	company_id: Joi.string().required(),
	job: Joi.string().required(),
	position: Joi.any()
		.valid(...positionEnum)
		.required(),
	profession: Joi.string().required(),
	exp: Joi.string().required(),
	salary: Joi.string().required().max(30),
	benefits: Joi.string().allow(""),
	describe: Joi.string().allow(""),
	end: Joi.string().required(),
	work_format: Joi.any()
		.valid(...formatEnum)
		.required(),
});
