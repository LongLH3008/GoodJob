import prisma from "../../../prisma";
import { StatusCode } from "../../enum/HttpStatus";
import { UID } from "../../interfaces/User.interface";
import { CVSchema } from "../../schemas/cv.schema";
import { SchemaValidate } from "../../schemas/validate";
import API_Error from "../../utils/Api.error";
import { generateUUID } from "../../utils/GenerateUUID";
import User from "../User/User.service";
import CV_Education from "./CVEducation.service";
import CV_Experience from "./CVExperience.service";
import CV_More from "./CVMore.service";
import CV_Reference from "./CVReference.service";
import CV_Skills from "./CVSkill.service";

class CV {
	private static async checkApplicant(applicant_id: UID) {
		const applicant = await User.get(applicant_id);
		if (applicant.user_role !== "Applicant" || applicant.check !== "1") {
			throw new API_Error("This user does not have permission", StatusCode.UNAUTHORIZED);
		}
		return true;
	}

	private static async checkCv(applicant_id: UID, name: string) {
		const cv = await prisma.cV.findFirst({ where: { applicant_id, name } });
		if (cv) throw new API_Error("This cv already exists", StatusCode.UNAUTHORIZED);
		return true;
	}

	static async checkCvVariant(id: UID, applicant_id: UID) {
		const cv = await prisma.cV.findFirst({
			where: {
				id,
				applicant_id,
			},
			include: {
				CV_Education: true,
				CV_Experience: true,
				CV_More: true,
				CV_Reference: true,
				CV_Skills: true,
			},
		});
		if (!cv) throw new API_Error("This cv does not exists", StatusCode.NOT_FOUND);
		if (cv.CV_Education.length > 3) throw new API_Error("CV_Education at most 3 item", StatusCode.UNAUTHORIZED);
		if (cv.CV_Experience.length > 3) throw new API_Error("CV_Experience at most 3 item", StatusCode.UNAUTHORIZED);
		if (cv.CV_More.length > 5) throw new API_Error("CV_More at most 5 item", StatusCode.UNAUTHORIZED);
		if (cv.CV_Reference.length > 3) throw new API_Error("CV_Reference at most 3 item", StatusCode.UNAUTHORIZED);
		if (cv.CV_Skills.length > 3) throw new API_Error("CV_Education at most 3 item", StatusCode.UNAUTHORIZED);
		return true;
	}

	static async getAll() {
		const cv_list = await prisma.cV.findMany();
		if (!cv_list.length) throw new API_Error("No Cv found", StatusCode.NOT_FOUND);
		return cv_list;
	}

	static async get(id: UID) {
		const cv = await prisma.cV.findFirst({
			where: { OR: [{ id }, { applicant_id: id }] },
			include: {
				CV_Education: true,
				CV_Experience: true,
				CV_More: true,
				CV_Reference: true,
				CV_Skills: true,
			},
		});
		if (!cv) throw new API_Error("This cv does not exist", StatusCode.NOT_FOUND);
		return cv;
	}

	static async delete(id: UID) {
		await this.get(id);
		return await prisma.cV.delete({ where: { id } });
	}

	static async deleteByApplicantId(id: UID, applicant_id: UID) {
		await Promise.all([this.get(id), this.checkApplicant(applicant_id)]);
		return await prisma.cV.delete({ where: { id, applicant_id } });
	}

	static async create(dt: any) {
		const { name, applicant_id, avatar, experience, skill, more, education, reference } = dt;
		SchemaValidate(CVSchema, dt);
		const id = generateUUID();
		await Promise.all([this.checkApplicant(applicant_id), this.checkCv(applicant_id, name)]);
		const newCv = await prisma.cV.create({
			data: {
				id,
				name,
				applicant_id,
				avatar,
			},
		});
		await Promise.all([
			CV_Experience.create(newCv.id, experience),
			CV_Education.create(newCv.id, education),
			CV_More.create(newCv.id, more),
			CV_Reference.create(newCv.id, reference),
			CV_Skills.create(newCv.id, skill),
		]);
		return newCv;
	}

	static async update(id: UID, dt: any) {
		const { name, applicant_id, avatar, recommended } = dt;
		SchemaValidate(CVSchema, dt);
		await this.checkApplicant(applicant_id);
		const isExist = await prisma.cV.findFirst({ where: { id: { not: id }, name } });
		if (isExist) throw new API_Error("This cv already exists", StatusCode.UNAUTHORIZED);
		return await prisma.cV.create({
			data: {
				id: generateUUID(),
				name,
				applicant_id,
				avatar,
				recommended,
			},
		});
	}
}

export default CV;
