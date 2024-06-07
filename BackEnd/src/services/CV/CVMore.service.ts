import prisma from "../../../prisma";
import { StatusCode } from "../../enum/HttpStatus";
import { UID } from "../../interfaces/User.interface";
import API_Error from "../../utils/Api.error";
import CV from "./CV.service";

class CV_More {
	static async get(id: number) {
		const exp = await prisma.cV_More.findFirst({ where: { id } });
		if (!exp) throw new API_Error("Not found Info", StatusCode.NOT_FOUND);
		return true;
	}

	static async deleteMany(idarray: number[]) {
		if (idarray.length > 0) await prisma.cV_More.deleteMany({ where: { id: { in: idarray } } });
	}

	static async createMany(cv_id: UID, More: any[]) {
		if (More && More.length > 0)
			await prisma.cV_More.createMany({
				data: More.map((key) => ({ ...key, cv_id })),
			});
	}

	static async updateMany(cv_id: UID, More: any[]) {
		if (!More) return;
		const cv = await CV.get(cv_id);
		const updateSeleted = More.filter((item) => item.id && item.cv_id !== "0");
		const deleteSeleted = More.flatMap((item) => (item.cv_id == "0" ? [item.id] : []));
		const createSelected = More.filter((item) => !item.id);

		if (deleteSeleted.length == 0 && createSelected.length + cv.CV_More.length > 5)
			throw new API_Error("More Info limit 5", StatusCode.UNAUTHORIZED);
		if (createSelected.length > 0) await this.createMany(cv_id, createSelected);
		if (deleteSeleted.length > 0) await this.deleteMany(deleteSeleted);
		if (updateSeleted.length > 0) {
			for (const item of updateSeleted) {
				await prisma.cV_More.update({ where: { id: item.id }, data: { ...item } });
			}
		}
		return;
	}
}

export default CV_More;
