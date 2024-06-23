"use client";
import { ScrollVerticalState } from "@/lib/state/scroll_vertical.ui";
import React, { ReactNode } from "react";

const StickyFooter = ({ children }: { children: ReactNode }) => {
	const { scroll, scrollHeight } = ScrollVerticalState();

	return (
		<>
			<div
				className={`
				${
					scrollHeight > 0 && scroll >= scrollHeight * 0.95
						? "opacity-1 -bottom-28 z-10"
						: "duration-0 opacity-0 -bottom-full -z-10"
				} 
				h-[550px] scale-[1.3] fixed transition-all duration-500 bg-[rgba(0,0,0,0.25)] rounded-tl-[75%] pt-20 pb-10 rounded-tr-[75%] w-full text-white`}
			></div>
			<div
				className={`
				${
					scrollHeight > 0 && scroll >= scrollHeight * 0.95
						? "opacity-1 -bottom-32 z-10"
						: "duration-0 opacity-0 -bottom-full -z-10"
				} 
				h-[550px] scale-125 fixed transition-all duration-700 bg-[rgba(0,0,0,0.55)] rounded-tl-[75%] pt-20 pb-10 rounded-tr-[75%] w-full text-white`}
			></div>
			<div
				className={`
				${scrollHeight > 0 && scroll > scrollHeight * 0.95 ? "opacity-1 z-20 bottom-0" : "opacity-0 -bottom-full -z-10"}
				 transition-all duration-1000 fixed bg-[rgba(0,0,0,0.85)] scale-110 rounded-tl-[75%] pt-20 pb-10 rounded-tr-[75%] w-full text-white`}
			>
				{children}
			</div>
		</>
	);
};

export default StickyFooter;
