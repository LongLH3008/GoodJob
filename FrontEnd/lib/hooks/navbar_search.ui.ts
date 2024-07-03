import { create } from "zustand";

export type Search = {
	isOpen: boolean;
	isChange?: boolean;
	dataFilter: {
		job?: string;
		position?: string;
		salary?: string;
		workform?: string;
		location?: string;
		profession?: string;
		exp?: string;
	};
	toggleSearch: () => void;
	setFilter: <K extends keyof Search["dataFilter"]>(key: K, value: string) => void;
	resetFilter: () => void;
};

export const FilterJob = create<Search>((set) => ({
	isOpen: false,
	scroll: false,
	isChange: false,
	dataFilter: { position: "", job: "", salary: "", location: "", profession: "", workform: "", exp: "" },
	toggleSearch: () => {
		set((state) => ({ isOpen: !state.isOpen }));
		window.document.body.style.overflowY === "hidden"
			? (window.document.body.style.overflowY = "scroll")
			: (window.document.body.style.overflowY = "hidden");
	},
	setFilter: (key, value) => {
		set((state) => {
			const dataFilter = { ...state.dataFilter, [key]: value };
			const isChange = Object.values(dataFilter).some((item) => item !== "");
			return {
				dataFilter,
				isChange,
			};
		});
	},
	resetFilter: () => {
		set({
			dataFilter: {
				position: "",
				job: "",
				salary: "",
				location: "",
				profession: "",
				workform: "",
				exp: "",
			},
			isChange: false,
		});
	},
}));
