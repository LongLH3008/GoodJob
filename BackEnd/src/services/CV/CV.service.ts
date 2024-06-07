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
	static async checkApplicant(applicant_id: UID, action: "update" | "create" | "turnOnRecommended" | "delete") {
		const applicant = await User.get(applicant_id);
		if (applicant.user_role !== "Applicant" || applicant.check !== "1") {
			throw new API_Error("This user does not have permission", StatusCode.UNAUTHORIZED);
		}
		const { CV, CV_import, User_ServiceUsing } = applicant;
		const { CV_Services } = User_ServiceUsing[0];
		if (CV_Services) {
			const cv = CV.filter((item) => item.recommended == "1");
			switch (action) {
				case "create":
					if (CV.length + CV_import.length + 1 > CV_Services.totalCv)
						throw new API_Error(
							"The number of CV creations has reached the limit, Upgrade for more",
							StatusCode.UNAUTHORIZED
						);
					break;
				case "turnOnRecommended": {
					if (cv.length + 1 > CV_Services.recommended)
						throw new API_Error(
							"The recommended of CV has reached the limit, Upgrade for more",
							StatusCode.UNAUTHORIZED
						);
					break;
				}
				default:
					break;
			}
		}
		return true;
	}

	private static async checkCv(applicant_id: UID, name: string) {
		const cv = await prisma.cV.findFirst({ where: { applicant_id, name } });
		if (cv) throw new API_Error("This cv already exists", StatusCode.UNAUTHORIZED);
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
		await Promise.all([this.get(id), this.checkApplicant(applicant_id, "delete")]);
		return await prisma.cV.delete({ where: { id, applicant_id } });
	}

	static async create(dt: any) {
		const { name, applicant_id, avatar } = dt;
		SchemaValidate(CVSchema, dt);
		const id = generateUUID();
		await Promise.all([this.checkApplicant(applicant_id, "create"), this.checkCv(applicant_id, name)]);
		const newCv = await prisma.cV.create({
			data: {
				id,
				name,
				applicant_id,
				avatar,
			},
		});
		await Promise.all([
			CV_Experience.createMany(newCv.id, dt.CV_Experience),
			CV_Education.createMany(newCv.id, dt.CV_Education),
			CV_More.createMany(newCv.id, dt.CV_More),
			CV_Reference.createMany(newCv.id, dt.CV_Reference),
			CV_Skills.createMany(newCv.id, dt.CV_Skill),
		]);
		return newCv;
	}

	static async update(id: UID, dt: any) {
		const { name, applicant_id, avatar } = dt;
		SchemaValidate(CVSchema, dt);
		await this.checkApplicant(applicant_id, "update");
		const isExist = await prisma.cV.findFirst({ where: { id: { not: id }, name } });
		if (isExist) throw new API_Error("This Cv Name already exists", StatusCode.UNAUTHORIZED);
		await Promise.all([
			CV_Experience.updateMany(id, dt.CV_Experience),
			CV_Education.updateMany(id, dt.CV_Education),
			CV_More.updateMany(id, dt.CV_More),
			CV_Reference.updateMany(id, dt.CV_Reference),
			CV_Skills.updateMany(id, dt.CV_Skill),
		]);
		const newCv = await prisma.cV.update({ where: { id, applicant_id }, data: { name, avatar } });
		return newCv;
	}

	static async recommended(id: UID, applicant_id: UID) {
		await Promise.all([this.get(id), this.checkApplicant(applicant_id, "turnOnRecommended")]);
		return await prisma.cV.update({ where: { id, applicant_id }, data: { recommended: "1" } });
	}

	static async notRecommended(id: UID, applicant_id: UID) {
		await Promise.all([this.get(id), this.checkApplicant(applicant_id, "update")]);
		return await prisma.cV.update({ where: { id, applicant_id }, data: { recommended: "0" } });
	}
}

export default CV;
