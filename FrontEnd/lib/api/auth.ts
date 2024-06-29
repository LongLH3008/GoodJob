import { UserState } from "../hooks/user";
import { instance } from "./api";

export const Logout = async () => {
	try {
		await instance.get("/auth/logout");
	} catch (error: any) {
		console.log(error);
	}
};

export const Login = async (dt: ILogin) => {
	try {
		const { data } = await instance.post("/auth/login", dt);
		return data;
	} catch (error: any) {
		return error;
	}
};

export const getUser = async (id: string) => {
	if (!id) return await instance.get("/auth/logout");
	try {
		const { data } = await instance.get(`user/${id}`);
		const { user_role, user_status, user_type, check, email, User_Information } = data.metadata;
		UserState.getState().setUser({
			user_role,
			user_status,
			user_type,
			check,
			email,
			avatar: User_Information.avatar !== "" ? User_Information.avatar : "",
		});
	} catch (error) {
		await instance.get("/auth/logout");
	}
};
