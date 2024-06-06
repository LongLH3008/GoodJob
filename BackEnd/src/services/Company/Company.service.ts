import { response } from "express";
import prisma from "../../../prisma";
import { StatusCode } from "../../enum/HttpStatus";
import { ICompany } from "../../interfaces/Company.interface";
import { UID } from "../../interfaces/User.interface";
import Locals from "../../providers/Locals";
import { CompanySchema } from "../../schemas/company.schema";
import { SchemaValidate } from "../../schemas/validate";
import API_Error from "../../utils/Api.error";
import User from "../User/User.service";
import { generateUUID } from "../../utils/GenerateUUID";

class Company {
	private static async checkExist(employer_id: UID, name: string) {
		const company = await prisma.company.findFirst({
			where: {
				OR: [{ employer_id }, { name }],
			},
		});
		if (company) throw new API_Error("Company already exist", StatusCode.UNAUTHORIZED);
		return;
	}

	private static async checkTaxCode(taxcode: string) {
		const company = await prisma.company.findFirst({ where: { taxcode } });
		if (company) throw new API_Error("Taxcode already exist", StatusCode.UNAUTHORIZED);
		// const response = await fetch(`${Locals.config().CHECK_TAXCODE}/${taxcode}`);
		// const result = response.json();
		// const { data } = result
		// if (data == null) throw new API_Error("Taxcode does not exist", StatusCode.UNAUTHORIZED);
		// return data
		return true;
	}

	private static async checkRoleUser(employer_id: UID) {
		const user = await User.get(employer_id);
		if (user.user_role !== "Employer" || user.check !== "1")
			throw new API_Error("This User does not have permission", StatusCode.UNAUTHORIZED);
		return;
	}

	static async uncheck(id: UID) {
		await Promise.all([this.get(id), prisma.company.update({ where: { id }, data: { check: "0" } })]);
		return true;
	}

	static async check(id: UID) {
		await Promise.all([this.get(id), prisma.company.update({ where: { id }, data: { check: "1" } })]);
		return true;
	}

	static async getAll() {
		const companies = await prisma.company.findMany();
		if (!companies.length) throw new API_Error("There are no company", StatusCode.NOT_FOUND);
		return companies;
	}

	static async get(id: UID) {
		const company = await prisma.company.findFirst({ where: { id } });
		if (!company) throw new API_Error("Company not found", StatusCode.NOT_FOUND);
		return company;
	}

	static async delete(id: UID) {
		await this.get(id);
		return await prisma.company.delete({ where: { id } });
	}

	static async create(dt: ICompany) {
		const { name, license, taxcode, employer_id, size, business, introduce, establish } = dt;
		SchemaValidate(CompanySchema, dt);
		await Promise.all([this.checkRoleUser(employer_id), this.checkExist(employer_id, name)]);
		// const result = await this.checkTaxCode(taxcode);
		return await prisma.company.create({
			data: {
				id: generateUUID(),
				employer_id,
				name,
				establish,
				size,
				business,
				introduce,
				taxcode,
				license,
				check: "0",
			},
		});
	}

	static async update(id: UID, dt: ICompany) {
		const { name, license, taxcode, employer_id, size, business, introduce, establish } = dt;
		SchemaValidate(CompanySchema, dt);
		await this.checkRoleUser(employer_id);
		const isExsit = await prisma.company.findFirst({ where: { id: { not: id }, name } });
		if (isExsit) throw new API_Error("This company already exists", StatusCode.UNAUTHORIZED);
		// const result = await this.checkTaxCode(taxcode);
		return await prisma.company.update({
			where: { id },
			data: {
				name,
				establish,
				size,
				business,
				introduce,
				taxcode,
				license,
			},
		});
	}
}

export default Company;
