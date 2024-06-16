import prisma from "../../prisma";
import { StatusCode } from "../enum/HttpStatus";
import { UID } from "../interfaces/User.interface";
import API_Error from "../utils/Api.error";
import CV from "./CV.service";

class CV_Experience {
	static async get(id: number) {
		const exp = await prisma.cV_Experience.findFirst({ where: { id } });
		if (!exp) throw new API_Error("Not found Experience", StatusCode.NOT_FOUND);
		return true;
	}

	static async deleteMany(idarray: number[]) {
		if (idarray.length > 0) await prisma.cV_Experience.deleteMany({ where: { id: { in: idarray } } });
	}

	static async createMany(cv_id: UID, Experience: any[]) {
		if (Experience && Experience.length > 0)
			await prisma.cV_Experience.createMany({
				data: Experience.map((key) => ({ ...key, cv_id })),
			});
	}

	static async updateMany(cv_id: UID, Experience: any[]) {
		if (!Experience) return;
		const cv = await CV.get(cv_id);
		const updateSeleted = Experience.filter((item) => item.id && item.cv_id !== "0");
		const deleteSeleted = Experience.flatMap((item) => (item.cv_id == "0" ? [item.id] : []));
		const createSelected = Experience.filter((item) => !item.id);

		if (deleteSeleted.length == 0 && createSelected.length + cv.CV_Experience.length > 5)
			throw new API_Error("Experience limit 5, add more in 'More Info", StatusCode.UNAUTHORIZED);
		if (createSelected.length > 0) await this.createMany(cv_id, createSelected);
		if (deleteSeleted.length > 0) await this.deleteMany(deleteSeleted);
		if (updateSeleted.length > 0) {
			for (const item of updateSeleted) {
				await prisma.cV_Experience.update({ where: { id: item.id }, data: { ...item } });
			}
		}
		return;
	}
}

export default CV_Experience;
