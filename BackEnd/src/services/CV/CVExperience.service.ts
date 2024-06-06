import prisma from "../../../prisma";
import { StatusCode } from "../../enum/HttpStatus";
import { UID } from "../../interfaces/User.interface";
import API_Error from "../../utils/Api.error";

class CV_Experience {
	private static async get(id: number) {
		const exp = await prisma.cV_Experience.findFirst({ where: { id } });
		if (!exp) throw new API_Error("Not found experience", StatusCode.NOT_FOUND);
		return true;
	}

	private static async deleteSingle(id: number) {
		await prisma.cV_Experience.delete({ where: { id } });
	}

	private async createSingle(cv_id: UID, data: any) {
		await prisma.cV_Experience.create({
			data: { ...data, cv_id },
		});
	}

	private async updateSingle(id: number, data: any) {
		await prisma.cV_Experience.update({ where: { id }, data });
	}

	static async create(cv_id: UID, experience: any[]) {
		await prisma.cV_Experience.createMany({
			data: experience.map((key) => ({ ...key, cv_id })),
		});
	}

	static async update(experience: any[]) {
		for (let item of experience) {
			await this.get(item.id);
			await prisma.cV_Experience.update({
				where: {
					id: item.id,
				},
				data: {
					...item,
				},
			});
		}
	}

	static async delete(id: number) {}
}

export default CV_Experience;
