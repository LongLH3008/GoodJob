import prisma from "../../prisma";
import { StatusCode } from "../enum/HttpStatus";
import { UID } from "../interfaces/User.interface";
import { RecruitmentSchema } from "../schemas/recruitment.schema";
import { SchemaValidate } from "../schemas/validate";
import API_Error from "../utils/Api.error";
import { generateUUID } from "../utils/GenerateUUID";
import { generateIOSTime, generateLocaleTime } from "../utils/Time";
import Company from "./Company.service";
import User from "./User.service";

class Recruitment {
	private static async checkCompany(
		employer_id: UID,
		company_id: UID,
		action: "create" | "delete" | "update" | "turnOnRecommended"
	) {
		const employer = await User.get(employer_id);
		if (employer.user_role !== "Employer")
			throw new API_Error("Your account does not have permission", StatusCode.UNAUTHORIZED);
		if (!employer.User_Contact || !employer.User_Information)
			throw new API_Error("You need to provide your information first", StatusCode.UNAUTHORIZED);
		if (employer.check !== "1")
			throw new API_Error("Your account is awaiting verification approval", StatusCode.UNAUTHORIZED);
		const company = await Company.get(company_id);
		if (company.check !== "1")
			throw new API_Error("Your company is awaiting verification approval", StatusCode.UNAUTHORIZED);
		if (employer && employer.User_ServiceUsing?.Recruitment_Services) {
			const { Recruitment_Services } = employer.User_ServiceUsing;
			switch (action) {
				case "create":
					if (company.Recruitment.length + 1 > Recruitment_Services?.totalRecr)
						throw new API_Error(
							"Recruitment creations has reached the limit, Upgrade for more",
							StatusCode.UNAUTHORIZED
						);
					break;
				case "turnOnRecommended":
					const recrRecommended = company.Recruitment.filter((item) => item.recommended == "1");
					if (recrRecommended.length + 1 > Recruitment_Services?.recommended)
						throw new API_Error(
							"Recruitment recommended has reached the limit, Upgrade for more",
							StatusCode.UNAUTHORIZED
						);
					break;
				default:
					break;
			}
		}
		return true;
	}

	static async getAll() {
		const recr_list = await prisma.recruitment.findMany();
		if (!recr_list.length) throw new API_Error("There are no Recruitment found", StatusCode.NOT_FOUND);
		return recr_list;
	}

	static async get(id: UID) {
		const recr = await prisma.recruitment.findFirst({
			where: { id },
			include: {
				Recruitment_Information: {
					select: {
						id: true,
						recr_info_status: true,
						CV: true,
						CV_import: true,
					},
				},
			},
		});
		if (!recr) throw new API_Error("Recruitment not found", StatusCode.NOT_FOUND);
		recr.createAt = generateLocaleTime(recr.createAt);
		recr.updateAt = recr.updateAt == null ? null : generateLocaleTime(recr.updateAt);
		recr.end = generateLocaleTime(recr.end);
		return recr;
	}

	static async delete(id: UID) {
		await this.get(id);
		return prisma.recruitment.delete({ where: { id } });
	}

	static async deleteByEmployer(id: UID, employer_id: UID, company_id: UID) {
		await Promise.all([this.get(id), this.checkCompany(employer_id, company_id, "delete")]);
		return await prisma.recruitment.delete({ where: { id, company_id } });
	}

	static async create(dt: any) {
		const { company_id, employer_id, job } = dt;
		SchemaValidate(RecruitmentSchema, dt);
		delete dt.employer_id;
		await this.checkCompany(employer_id, company_id, "create");
		const isExsit = await prisma.recruitment.findFirst({ where: { company_id, job } });
		if (isExsit) throw new API_Error("This recr already exists", StatusCode.UNAUTHORIZED);
		return await prisma.recruitment.create({
			data: { ...dt, id: generateUUID(), recr_status: "Recruiting", end: generateIOSTime(dt.end) },
		});
	}

	static async update(id: UID, dt: any) {
		const { company_id, employer_id, job } = dt;
		SchemaValidate(RecruitmentSchema, dt);
		delete dt.employer_id;
		await this.checkCompany(employer_id, company_id, "update");
		const isExsit = await prisma.recruitment.findFirst({ where: { id: { not: id }, company_id, job } });
		if (isExsit) throw new API_Error("This recr already exists", StatusCode.UNAUTHORIZED);
		return await prisma.recruitment.update({
			where: { id, company_id },
			data: { ...dt, updateAt: generateIOSTime(), end: generateIOSTime(dt.end) },
		});
	}

	static async recommended(id: UID, employer_id: UID, company_id: UID) {
		await Promise.all([this.get(id), this.checkCompany(employer_id, company_id, "turnOnRecommended")]);
		return await prisma.recruitment.update({ where: { id, company_id }, data: { recommended: "1" } });
	}

	static async notRecommended(id: UID, employer_id: UID, company_id: UID) {
		await Promise.all([this.get(id), this.checkCompany(employer_id, company_id, "update")]);
		return await prisma.recruitment.update({ where: { id, company_id }, data: { recommended: "0" } });
	}
}

export default Recruitment;
