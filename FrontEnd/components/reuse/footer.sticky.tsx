"use client";
import { ScrollVerticalState } from "@/lib/hooks/scroll_vertical.ui";
import React, { ReactNode } from "react";

const StickyFooter = ({ children, className }: { children: ReactNode; className: string }) => {
	const { scroll, scrollHeight } = ScrollVerticalState();

	return (
		<div className="hidden lg:flex justify-center w-full overflow-hidden">
			<div
				className={`
				${
					scrollHeight > 0 && scroll >= scrollHeight * 0.98
						? "opacity-1 -bottom-0 z-10"
						: "duration-0 opacity-0 -bottom-full -z-10"
				} 
				hidden lg:flex self-center w-[120%] h-[510px] fixed transition-all duration-500 bg-[rgba(0,0,0,0.25)] rounded-tl-[75%] rounded-tr-[75%] text-white`}
			></div>
			<div
				className={`
				${
					scrollHeight > 0 && scroll >= scrollHeight * 0.98
						? "opacity-1 -bottom-0 z-10"
						: "duration-0 opacity-0 -bottom-full -z-10"
				} 
				hidden lg:block self-center h-[480px] w-[113%] fixed transition-all duration-700 bg-[rgba(0,0,0,0.55)] rounded-tl-[75%] rounded-tr-[75%] text-white`}
			></div>
			<div
				className={`
				${scrollHeight > 0 && scroll > scrollHeight * 0.98 ? "opacity-1 z-20 bottom-0" : "opacity-0 -bottom-full -z-10"}
				 transition-all duration-1000 flex justify-center items-center pt-10 fixed self-center w-[108%] bg-[rgba(0,0,0,0.85)] rounded-tl-[75%] rounded-tr-[75%] text-white
				 ${className}`}
			>
				{children}
			</div>
		</div>
	);
};

export default StickyFooter;
