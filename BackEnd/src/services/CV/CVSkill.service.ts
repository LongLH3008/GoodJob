import prisma from "../../../prisma";
import { UID } from "../../interfaces/User.interface";

class CV_Skills {
	static async create(cv_id: UID, skills: any[]) {
		await prisma.cV_Skills.createMany({
			data: skills.map((key) => ({ ...key, cv_id })),
		});
	}
}

export default CV_Skills;
