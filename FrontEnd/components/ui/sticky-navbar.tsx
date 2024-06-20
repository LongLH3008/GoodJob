"use client";

import React, { ReactNode, useEffect, useState } from "react";

const StickNavbar = ({ children, className }: { children: ReactNode; className: string }) => {
	const [scroll, setScroll] = useState(0);

	useEffect(() => {
		const handleScroll = () => setScroll(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	return (
		<div
			className={`
                ${scroll < 5 && "h-[68px] lg:h-[95px] duration-0  max-h-fit"}
                ${scroll > 5 && scroll < 50 && "opacity-0 -top-24"}
                ${
				scroll > 50 &&
				"fixed min-h-[30px] py-2 max-h-fit hover:shadow-md  border-b top-0 bg-[rgba(255,255,255,0.5)] opacity-100"
			}
                ease-in duration-500 z-30 w-full max-h-fit
                ${className}
                `}
		>
			{children}
		</div>
	);
};

export default StickNavbar;
