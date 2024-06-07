import prisma from "../../../prisma";
import { StatusCode } from "../../enum/HttpStatus";
import { UID } from "../../interfaces/User.interface";
import API_Error from "../../utils/Api.error";
import CV from "./CV.service";

class CV_Skills {
	static async get(id: number) {
		const exp = await prisma.cV_Skills.findFirst({ where: { id } });
		if (!exp) throw new API_Error("Not found Skills", StatusCode.NOT_FOUND);
		return true;
	}

	static async deleteMany(idarray: number[]) {
		if (idarray.length > 0) await prisma.cV_Skills.deleteMany({ where: { id: { in: idarray } } });
	}

	static async createMany(cv_id: UID, Skills: any[]) {
		if (Skills && Skills.length > 0)
			await prisma.cV_Skills.createMany({
				data: Skills.map((key) => ({ ...key, cv_id })),
			});
	}

	static async updateMany(cv_id: UID, Skills: any[]) {
		if (!Skills) return;
		const cv = await CV.get(cv_id);
		const updateSeleted = Skills.filter((item) => item.id && item.cv_id !== "0");
		const deleteSeleted = Skills.flatMap((item) => (item.cv_id == "0" ? [item.id] : []));
		const createSelected = Skills.filter((item) => !item.id);

		if (deleteSeleted.length == 0 && createSelected.length + cv.CV_Skills.length > 8)
			throw new API_Error("Skills limit 8, add more in 'More Info", StatusCode.UNAUTHORIZED);
		if (createSelected.length > 0) await this.createMany(cv_id, createSelected);
		if (deleteSeleted.length > 0) await this.deleteMany(deleteSeleted);
		if (updateSeleted.length > 0) {
			for (const item of updateSeleted) {
				await prisma.cV_Skills.update({ where: { id: item.id }, data: { ...item } });
			}
		}
		return;
	}
}

export default CV_Skills;
