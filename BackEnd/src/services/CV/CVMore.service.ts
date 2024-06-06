import prisma from "../../../prisma";
import { UID } from "../../interfaces/User.interface";

class CV_More {
	static async create(cv_id: UID, more: any[]) {
		await prisma.cV_More.createMany({
			data: more.map((key) => ({ ...key, cv_id })),
		});
	}
}

export default CV_More;
