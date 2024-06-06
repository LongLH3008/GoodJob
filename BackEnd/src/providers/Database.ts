import prisma from "../../prisma";

class Database {
	public static async connect() {
		try {
			await prisma.$connect();
			console.log("Prisma is connected");
		} catch (error) {
			console.log("Error connecting");
		}
	}
}

export default Database;
