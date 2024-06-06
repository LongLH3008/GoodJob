import { notEqual } from "assert";
import prisma from "../../../prisma";
import { StatusCode } from "../../enum/HttpStatus";
import { Recr_ServiceSchema } from "../../schemas/user_service.schema";
import { SchemaValidate } from "../../schemas/validate";
import API_Error from "../../utils/Api.error";
import { IRecr_Service } from "../../interfaces/User_Service.interface";

class Recr_Service {
	static async getAll() {
		const services = await prisma.recruitment_Services.findMany();
		if (!services.length) throw new API_Error("There are no services", StatusCode.NOT_FOUND);
		return services;
	}

	static async get(id: any) {
		const service = await prisma.recruitment_Services.findUnique({ where: { id: +id } });
		if (!service) throw new API_Error("Service does not exist", StatusCode.NOT_FOUND);
		return service;
	}

	static async delete(id: any) {
		await this.get(id);
		return await prisma.recruitment_Services.delete({ where: { id: +id } });
	}

	static async create(dt: IRecr_Service) {
		const { name, price, discount, recr_service_expired, describe, recommended, totalRecr } = dt;
		const isExist = await prisma.recruitment_Services.findFirst({ where: { name } });
		if (isExist) throw new API_Error("Service already exists", StatusCode.UNAUTHORIZED);
		SchemaValidate(Recr_ServiceSchema, dt);
		return await prisma.recruitment_Services.create({
			data: {
				name,
				price,
				discount,
				recr_service_expired,
				describe,
				recommended: +recommended,
				totalRecr,
			},
		});
	}

	static async update(id: any, dt: IRecr_Service) {
		const service = await this.get(id);
		const { name, price, discount, recr_service_expired, describe, recommended, totalRecr } = dt;
		const isExist = await prisma.recruitment_Services.findFirst({
			where: {
				name: { not: service.name },
			},
		});
		if (isExist) throw new API_Error("Service already exists", StatusCode.UNAUTHORIZED);
		SchemaValidate(Recr_ServiceSchema, dt);
		return await prisma.recruitment_Services.create({
			data: {
				name,
				price,
				discount,
				recr_service_expired,
				describe,
				recommended: +recommended,
				totalRecr,
			},
		});
	}
}

export default Recr_Service;
