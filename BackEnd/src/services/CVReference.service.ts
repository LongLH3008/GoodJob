import prisma from "../../prisma";
import { StatusCode } from "../enum/HttpStatus";
import { UID } from "../interfaces/User.interface";
import API_Error from "../utils/Api.error";
import CV from "./CV.service";

class CV_Reference {
	static async get(id: number) {
		const exp = await prisma.cV_Reference.findFirst({ where: { id } });
		if (!exp) throw new API_Error("Not found Reference", StatusCode.NOT_FOUND);
		return true;
	}

	static async deleteMany(idarray: number[]) {
		if (idarray.length > 0) await prisma.cV_Reference.deleteMany({ where: { id: { in: idarray } } });
	}

	static async createMany(cv_id: UID, Reference: any[]) {
		if (Reference && Reference.length > 0)
			await prisma.cV_Reference.createMany({
				data: Reference.map((key) => ({ ...key, cv_id })),
			});
	}

	static async updateMany(cv_id: UID, Reference: any[]) {
		if (!Reference) return;
		const cv = await CV.get(cv_id);
		const updateSeleted = Reference.filter((item) => item.id && item.cv_id !== "0");
		const deleteSeleted = Reference.flatMap((item) => (item.cv_id == "0" ? [item.id] : []));
		const createSelected = Reference.filter((item) => !item.id);

		if (deleteSeleted.length == 0 && createSelected.length + cv.CV_Reference.length > 3)
			throw new API_Error("Reference limit 3, add more in 'More Info", StatusCode.UNAUTHORIZED);
		if (createSelected.length > 0) await this.createMany(cv_id, createSelected);
		if (deleteSeleted.length > 0) await this.deleteMany(deleteSeleted);
		if (updateSeleted.length > 0) {
			for (const item of updateSeleted) {
				await prisma.cV_Reference.update({ where: { id: item.id }, data: { ...item } });
			}
		}
		return;
	}
}

export default CV_Reference;
