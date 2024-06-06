import Joi from "joi";

const voteEnum = ["Terrible", "Poor", "Average", "Good", "Very_Good"];

export const ReviewSchema = Joi.object({
	applicant_id: Joi.string().required(),
	company_id: Joi.string().required(),
	vote: Joi.string().valid(...voteEnum),
	content: Joi.string().required().min(10),
});
