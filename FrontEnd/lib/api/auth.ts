import { ContactState, InfoState, UserState } from "../hooks/user";
import { instance } from "./api";

export const Logout = async () => {
	try {
		await instance.get("/auth/logout");
		UserState.getState().resetUser();
		InfoState.getState().resetInfo();
		ContactState.getState().resetContact();
	} catch (error: any) {
		console.log(error);
		UserState.getState().resetUser();
		InfoState.getState().resetInfo();
		ContactState.getState().resetContact();
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

export const getUser = async (user_id: string) => {
	if (!user_id) return await instance.get("/auth/logout");
	try {
		const { data } = await instance.get(`user/${user_id}`);

		const { id, user_role, user_status, user_type, check, email, User_Information, User_Contact } =
			data.metadata;
		UserState.getState().setUser({
			user_role,
			user_status,
			user_type,
			check,
			email,
			id,
		});

		if (User_Information !== null) {
			InfoState.getState().setInfo({ ...User_Information });
		}

		if (User_Contact !== null) {
			ContactState.getState().setContact({ ...User_Contact });
		}
	} catch (error) {
		await Logout();
	}
};
