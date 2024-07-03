"use client";

import { FilterJob } from "@/lib/hooks/navbar_search.ui";
import { ScrollVerticalState } from "@/lib/hooks/scroll_vertical.ui";
import React, { ReactNode, useEffect, useState } from "react";

const StickNavbar = ({ children, className }: { children: ReactNode; className: string }) => {
	const { scroll, scrollHeight, setScroll } = ScrollVerticalState();
	const { isOpen } = FilterJob();
	useEffect(() => {
		const handleScroll = () => {
			setScroll(window.scrollY, window.document.body.scrollHeight - window.innerHeight);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className={`
                ${scroll < 5 && "h-[68px] lg:h-[95px] duration-0 relative"}
                ${scroll > 5 && scroll < 50 && "opacity-0 -top-24"}
                ${scroll > 50 && "fixed min-h-[30px] py-2 max-h-fit top-0 bg-[rgba(255,255,255,0.5)] opacity-100"}
				${scroll > 50 && !isOpen && "border-b"}
                ease-in duration-500 z-30 w-full max-h-fit bg-white
                ${className}
                `}
		>
			{children}
		</div>
	);
};

export default StickNavbar;
