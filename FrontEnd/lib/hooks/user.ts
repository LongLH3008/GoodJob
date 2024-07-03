"use client";
import { create } from "zustand";

interface UserState {
	id?: string;
	email: string;
	user_role?: string | user_role_t;
	user_status?: string | user_status_t;
	user_type: string | user_type_t;
	check: "1" | "0";
	isLogged: boolean;
	setUser: (user: Partial<UserState>) => void;
	resetUser: () => void;
}

export const UserState = create<UserState>((set) => ({
	id: "",
	email: "",
	user_role: "",
	user_status: "",
	user_type: "",
	check: "0",
	isLogged: false,
	setUser: (user: Partial<UserState>) => set((state) => ({ ...state, ...user, isLogged: true })),
	resetUser: () => {
		set((state) => ({
			email: "",
			id: "",
			user_role: "",
			user_status: "",
			user_type: "",
			check: "0",
			isLogged: false,
		}));
	},
}));

interface InfoState {
	id?: number;
	user_id?: string;
	avatar?: string;
	name: string;
	birth: string;
	gender: string | gender_t;
	company_role: string | company_role_t;
	setInfo: (info: Partial<InfoState>) => void;
	resetInfo: () => void;
}

export const InfoState = create<InfoState>((set) => ({
	id: 0,
	avatar: "",
	name: "",
	birth: "",
	gender: "",
	company_role: "",
	setInfo: (info: Partial<InfoState>) => {
		set((state) => ({ ...state, ...info }));
	},
	resetInfo: () => set({ avatar: "", name: "", birth: "", gender: "", company_role: "" }),
}));

interface ContactState {
	id: number;
	city: string;
	district: string;
	detail_address: string;
	phone: string;
	ward: string;
	setContact: (contact: Partial<ContactState>) => void;
	resetContact: () => void;
}

export const ContactState = create<ContactState>((set) => ({
	id: 0,
	city: "",
	district: "",
	detail_address: "",
	phone: "",
	ward: "",
	setContact: (contact: Partial<ContactState>) => {
		set((state) => ({ ...state, ...contact }));
	},
	resetContact: () => set({ id: 0, city: "", district: "", detail_address: "", phone: "", ward: "" }),
}));
