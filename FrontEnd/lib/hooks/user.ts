import { create } from "zustand";
import { instance } from "../api/api";

type T = {
	email: string;
	user_role?: string | user_role_t;
	user_status?: string | user_status_t;
	user_type: string | user_type_t;
	check: "1" | "0";
	isLogged: boolean;
	setUser: (user: Partial<T>) => void;
};

export const UserState = create<T>((set) => ({
	email: "",
	user_role: "",
	user_status: "",
	user_type: "",
	check: "0",
	isLogged: false,
	setUser: (user: Partial<T>) => set((state) => ({ ...state, ...user, isLogged: true })),
}));

export const checkLogin = async () => {
	const cookie = document.cookie
		.split("; ")
		.find((item) => item.startsWith("uid="))
		?.split("uid=")[1];
	if (!cookie) return false;
	const { data } = await instance.get(`user/${cookie}`);
	const { user_role, user_status, user_type, check, email } = data.metadata;
	UserState.getState().setUser({ user_role, user_status, user_type, check, email });
};
