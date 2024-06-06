import { T_Timestamp, UID } from "./User.interface";

interface ICompany extends T_Timestamp {
	id?: UID;
	employer_id: UID;
	name: string;
	establish: string;
	size: number;
	business: string;
	introduce: string;
	taxcode: string;
	license: string;
	check: int;
}
