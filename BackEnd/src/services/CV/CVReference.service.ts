import prisma from "../../../prisma";
import { UID } from "../../interfaces/User.interface";

class CV_Reference {
	static async create(cv_id: UID, reference: any[]) {
		await prisma.cV_Reference.createMany({
			data: reference.map((key) => ({ ...key, cv_id })),
		});
	}
}

export default CV_Reference;
