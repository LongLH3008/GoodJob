import { user_role_t } from "@prisma/client";
import { UUID } from "crypto";

type UID = UUID | string;
type T_Timestamp = {
	createAt?: string;
	updateAt?: string;
};

type TLogin = {
	email: string;
	password: string;
};

type TRegister = {
	email: string;
	password: string;
	confirmpassword: string;
	user_role: user_role_t;
};

interface IUser {
	id?: UID;
	email: string;
	password: string;
	user_type: user_type_t;
	user_role: user_role_t;
	user_status?: user_status_t;
	check?: string;
}

interface IUserInfo extends T_Timestamp {
	avatar: string;
	name: string;
	birth?: string | undefined;
	gender: gender_t;
	company_role: company_role_t;
	city: string;
	district: string;
	detail_address: string;
	phone: string;
	ward: string;
}
