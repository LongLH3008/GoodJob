import { create } from "zustand";

interface Search {
	companySearch: {
		location: string;
		name: string;
	};
	isChange: boolean;
	setSearch: <K extends keyof Search["companySearch"]>(key: K, value: Search["companySearch"][K]) => void;
	resetSearch: () => void;
}

export const CompanySearchState = create<Search>((set) => ({
	companySearch: {
		location: "",
		name: "",
	},
	isChange: false,
	setSearch: <K extends keyof Search["companySearch"]>(key: K, value: Search["companySearch"][K]) => {
		set((state) => {
			const companySearch = { ...state.companySearch, [key]: value };
			const isChange = Object.values(companySearch).some((item) => item !== "");
			return {
				companySearch,
				isChange,
			};
		});
	},
	resetSearch: () => {
		set({ companySearch: { location: "", name: "" }, isChange: false });
	},
}));
