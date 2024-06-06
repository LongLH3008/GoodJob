import prisma from "../../../prisma";
import { UID } from "../../interfaces/User.interface";

class CV_Education {
	static async create(cv_id: UID, education: any[]) {
		await prisma.cV_Education.createMany({
			data: education.map((key) => ({ ...key, cv_id })),
		});
	}
}

export default CV_Education;
