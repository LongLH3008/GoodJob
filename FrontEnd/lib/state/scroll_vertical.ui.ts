import { create } from "zustand";

type scroll = {
	scroll: number;
	scrollHeight: number;
	setScroll: (scroll: number, scrollHeight: number) => void;
};

export const ScrollVerticalState = create<scroll>((set) => ({
	scroll: 0,
	scrollHeight: 0,
	setScroll: (scroll: number, scrollHeight: number) => {
		set({ scroll, scrollHeight });
	},
}));
