import { notEqual } from "assert";
import prisma from "../../prisma";
import { StatusCode } from "../enum/HttpStatus";
import { CV_ServiceSchema } from "../schemas/user_service.schema";
import { SchemaValidate } from "../schemas/validate";
import API_Error from "../utils/Api.error";
import { ICV_Service } from "../interfaces/User_Service.interface";
import { generateIOSTime, generateLocaleTime } from "../utils/Time";

class CV_Service {
	static async getAll() {
		const services = await prisma.cV_Services.findMany();
		if (!services.length) throw new API_Error("There are no services", StatusCode.NOT_FOUND);
		return services;
	}

	static async get(id: any) {
		const service = await prisma.cV_Services.findUnique({ where: { id: +id } });
		if (!service) throw new API_Error("Service does not exist", StatusCode.NOT_FOUND);
		service.createAt = generateLocaleTime(service.createAt);
		service.updateAt = service.updateAt == null ? null : generateLocaleTime(service.updateAt);
		return service;
	}

	static async delete(id: any) {
		await this.get(id);
		return await prisma.cV_Services.delete({ where: { id: +id } });
	}

	static async create(dt: ICV_Service) {
		const { name, price, discount, cv_service_expired, describe, recommended, totalCv } = dt;
		const isExist = await prisma.cV_Services.findFirst({ where: { name } });
		if (isExist) throw new API_Error("Service already exists", StatusCode.UNAUTHORIZED);
		SchemaValidate(CV_ServiceSchema, dt);
		return await prisma.cV_Services.create({
			data: {
				name,
				price,
				discount,
				cv_service_expired,
				describe,
				recommended: +recommended,
				totalCv,
			},
		});
	}

	static async update(id: any, dt: ICV_Service) {
		const service = await this.get(id);
		const { name, price, discount, cv_service_expired, describe, recommended, totalCv } = dt;
		const isExist = await prisma.cV_Services.findFirst({
			where: {
				name: { not: service.name },
			},
		});
		if (isExist) throw new API_Error("Service already exists", StatusCode.UNAUTHORIZED);
		SchemaValidate(CV_ServiceSchema, dt);
		return await prisma.cV_Services.create({
			data: {
				name,
				price,
				discount,
				cv_service_expired,
				describe,
				recommended: +recommended,
				totalCv,
				updateAt: generateIOSTime(),
			},
		});
	}
}

export default CV_Service;
