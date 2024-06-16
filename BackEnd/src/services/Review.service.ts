import prisma from "../../prisma";
import { StatusCode } from "../enum/HttpStatus";
import { UID } from "../interfaces/User.interface";
import { ReviewSchema } from "../schemas/review.schema";
import { SchemaValidate } from "../schemas/validate";
import API_Error from "../utils/Api.error";
import { generateIOSTime, generateLocaleTime } from "../utils/Time";
import Company from "./Company.service";
import User from "./User.service";

class Review {
	private static async checkApplicant(applicant_id: UID) {
		const user = await User.get(applicant_id);
		if (user.user_role !== "Applicant" || user.check !== "1") {
			throw new API_Error("This user does not have permission", StatusCode.UNAUTHORIZED);
		}
		return true;
	}

	private static async checkCompany(company_id: UID) {
		const company = await Company.get(company_id);
		if (company.check !== "1")
			throw new API_Error("This company need to provide information", StatusCode.UNAUTHORIZED);
		return true;
	}

	static async getAll() {
		const reviews = await prisma.reviews.findMany();
		if (!reviews.length) throw new API_Error("No reviews found", StatusCode.NOT_FOUND);
		return reviews;
	}

	static async get(id: number) {
		const review = await prisma.reviews.findFirst({ where: { id: +id } });
		if (!review) throw new API_Error("No review found", StatusCode.NOT_FOUND);
		review.createAt = generateLocaleTime(review.createAt);
		review.updateAt = review.updateAt == null ? null : generateLocaleTime(review.updateAt);
		return review;
	}

	static async delete(id: number) {
		await this.get(id);
		return await prisma.reviews.delete({ where: { id: +id } });
	}

	static async deleteByApplicantId(id: number, applicant_id: UID) {
		await Promise.all([this.get(id), this.checkApplicant(applicant_id)]);
		return await prisma.reviews.delete({ where: { id: +id, applicant_id } });
	}

	static async getReviewsByCompanyId(company_id: UID) {
		await this.checkCompany(company_id);
		const reviews = await prisma.reviews.findMany({ where: { company_id } });
		if (!reviews.length) throw new API_Error("No reviews found", StatusCode.NOT_FOUND);
		return reviews;
	}

	static async create(dt: any) {
		const { content, vote, applicant_id, company_id } = dt;
		SchemaValidate(ReviewSchema, dt);
		await Promise.all([this.checkApplicant(applicant_id), this.checkCompany(company_id)]);
		const isExist = await prisma.reviews.findFirst({ where: { applicant_id, company_id } });
		if (isExist) throw new API_Error("You already have review this company", StatusCode.UNAUTHORIZED);
		return await prisma.reviews.create({
			data: {
				applicant_id,
				company_id,
				content,
				vote,
			},
		});
	}

	static async update(id: number, dt: any) {
		const { content, vote, applicant_id, company_id } = dt;
		SchemaValidate(ReviewSchema, dt);
		await Promise.all([this.checkApplicant(applicant_id), this.checkCompany(company_id)]);
		const isExist = await prisma.reviews.findFirst({ where: { id: +id, applicant_id, company_id } });
		if (!isExist) throw new API_Error("This review does not exist", StatusCode.NOT_FOUND);
		return await prisma.reviews.update({
			where: {
				id: +id,
				applicant_id,
				company_id,
			},
			data: {
				content,
				vote,
				updateAt: generateIOSTime(),
			},
		});
	}
}

export default Review;
