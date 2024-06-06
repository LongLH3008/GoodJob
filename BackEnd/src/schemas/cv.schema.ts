import Joi from "joi";

const roleEnum = ["Employee", "Manager"];
const eduEnum = ["Banchelor", "Master", "Doctorate", "Diplopma"];
const refEnum = ["Employee", "Department_Manager", "Director", "CEO"];

export const CVExperienceSchema = Joi.object({
	company: Joi.string().allow("").max(30),
	time_from: Joi.string().allow(""),
	time_to: Joi.string().allow(""),
	exp_role: Joi.string().valid(...roleEnum),
	describe: Joi.string().allow("").max(255),
});

export const CVEducationSchema = Joi.object({
	school: Joi.string().allow(""),
	time_from: Joi.string().allow(""),
	time_to: Joi.string().allow(""),
	GPA: Joi.number().allow(""),
	degree: Joi.string()
		.valid(...eduEnum)
		.allow(""),
});

export const CVReferenceSchema = Joi.object({
	name: Joi.string().allow("").max(30),
	email: Joi.string().email({ tlds: false }).allow(""),
	company: Joi.string().allow(""),
	ref_role: Joi.string().valid(...refEnum),
});

export const CVSkillSchema = Joi.object({
	name: Joi.string().allow("").max(30),
	describe: Joi.string().allow("").max(100),
});

export const CVMoreSchema = Joi.object({
	name: Joi.string().allow("").max(15),
	describe: Joi.string().allow("").max(255),
});

export const CVSchema = Joi.object({
	applicant_id: Joi.string().required(),
	name: Joi.string().required(),
	avatar: Joi.string().allow(""),
	experience: Joi.array().items(CVExperienceSchema).allow(""),
	education: Joi.array().items(CVEducationSchema).allow(""),
	more: Joi.array().items(CVMoreSchema).allow(""),
	skill: Joi.array().items(CVSkillSchema).allow(""),
	reference: Joi.array().items(CVReferenceSchema).allow(""),
});
