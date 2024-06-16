import prisma from "../../prisma";
import { StatusCode } from "../enum/HttpStatus";
import { UID } from "../interfaces/User.interface";
import API_Error from "../utils/Api.error";
import { recr_info_status_t } from "@prisma/client";

class RecrInfo {
	static async getAll() {
		const recr_info_list = await prisma.recruitment_Information.findMany();
		if (!recr_info_list.length) throw new API_Error("There are no recr info", StatusCode.NOT_FOUND);
		return recr_info_list;
	}

	static async get(recr_id: number) {
		const recr_info = await prisma.recruitment_Information.findFirst({
			where: { id: recr_id },
			include: {
				CV: { select: { User: { select: { id: true } } } },
				CV_import: { select: { User: { select: { id: true } } } },
				Recruitment: { select: { Company: { select: { id: true } } } },
			},
		});
		if (!recr_info) throw new API_Error("Cannot find recr info", StatusCode.NOT_FOUND);
		return recr_info;
	}

	static async create(cv_id: UID, recr_id: UID, options: "import" | "create") {
		try {
			await prisma.$executeRaw`CALL create_recruitment_information(${cv_id}, ${recr_id}, ${options})`;
			return true;
		} catch (error: any) {
			throw new API_Error(error.meta.message, StatusCode.CONFLICT);
		}
	}

	static async update(employer_id: UID, id: number, action: recr_info_status_t) {
		try {
			await prisma.$executeRaw`CALL update_recruitment_information(${employer_id}, ${id}, ${action}::recr_info_status_t)`;
			return true;
		} catch (error: any) {
			throw new API_Error(error.meta.message, StatusCode.CONFLICT);
		}
	}
}

export default RecrInfo;
