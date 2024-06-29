"use client";
import { create } from "zustand";
import { instance } from "../api/api";
import { Logout } from "../api/auth";
import Cookies from "js-cookie";

type T = {
	email: string;
	avatar: string;
	user_role?: string | user_role_t;
	user_status?: string | user_status_t;
	user_type: string | user_type_t;
	check: "1" | "0";
	isLogged: boolean;
	setUser: (user: Partial<T>) => void;
	resetUser: () => void;
};

export const UserState = create<T>((set) => ({
	email: "",
	user_role: "",
	avatar: "",
	user_status: "",
	user_type: "",
	check: "0",
	isLogged: false,
	setUser: (user: Partial<T>) => set((state) => ({ ...state, ...user, isLogged: true })),
	resetUser: () => {
		set((state) => ({
			email: "",
			user_role: "",
			avatar: "",
			user_status: "",
			user_type: "",
			check: "0",
			isLogged: false,
		}));
	},
}));
