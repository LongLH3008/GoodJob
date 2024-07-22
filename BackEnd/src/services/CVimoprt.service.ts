import prisma from "../../prisma";
import { StatusCode } from "../enum/HttpStatus";
import { UID } from "../interfaces/User.interface";
import { CVImportSchema } from "../schemas/cv.schema";
import { SchemaValidate } from "../schemas/validate";
import API_Error from "../utils/Api.error";
import { generateUUID } from "../utils/GenerateUUID";
import User from "./User.service";
import CV from "./CV.service";

class CV_Import {
	private static async checkCv(applicant_id: UID, name: string) {
		const cv = await prisma.cV_import.findFirst({ where: { applicant_id, name } });
		if (cv) throw new API_Error("This cv already exists", StatusCode.UNAUTHORIZED);
		return true;
	}

	static async get(id: UID) {
		const file = await prisma.cV_import.findFirst({ where: { id } });
		if (!file) throw new API_Error("This file does not exist", StatusCode.NOT_FOUND);
		return file;
	}

	static async getAll(filter: any) {
		const files = await prisma.cV_import.findMany({
			where: filter,
			orderBy: { createAt: "desc" },
		});
		if (!files.length) throw new API_Error("There are no import files", StatusCode.NOT_FOUND);
		return files;
	}

	static async delete(id: UID) {
		await this.get(id);
		return await prisma.cV_import.delete({ where: { id } });
	}

	static async deleteByApplicantId(id: UID, applicant_id: UID) {
		await Promise.all([this.get(id), CV.checkApplicant(applicant_id, "delete")]);
		return await prisma.cV_import.delete({ where: { id, applicant_id } });
	}

	static async create(dt: any) {
		const { name, applicant_id } = dt;
		SchemaValidate(CVImportSchema, dt);
		await Promise.all([CV.checkApplicant(applicant_id, "create"), this.checkCv(applicant_id, name)]);
		const isExist = await prisma.cV_import.findFirst({ where: { name } });
		if (isExist) throw new API_Error("This Cv file name already exists", StatusCode.UNAUTHORIZED);
		return await prisma.cV_import.create({ data: { ...dt, id: generateUUID() } });
	}

	static async update(id: UID, dt: any) {
		const { name, applicant_id } = dt;
		SchemaValidate(CVImportSchema, dt);
		await CV.checkApplicant(applicant_id, "update");
		const isExist = await prisma.cV_import.findFirst({
			where: { id: { not: id }, name },
		});
		if (isExist) throw new API_Error("This Cv name alear already exists", StatusCode.UNAUTHORIZED);
		return await prisma.cV_import.update({ where: { id }, data: { name } });
	}
}

export default CV_Import;
