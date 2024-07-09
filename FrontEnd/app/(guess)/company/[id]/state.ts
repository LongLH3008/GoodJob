import create from "zustand";

type Review = {
	review: any[];
	setReview: (arr: any[]) => void;
	reset: () => void;
};

export const WriteReviewState = create<Review>((set) => ({
	review: [],
	setReview: (arr: any[]) => {
		set({ review: arr });
	},
	reset: () => {
		set({ review: [] });
	},
}));
