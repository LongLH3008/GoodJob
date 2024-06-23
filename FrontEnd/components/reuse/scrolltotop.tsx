"use client";
import { ScrollVerticalState } from "@/lib/state/scroll_vertical.ui";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
	const { scroll } = ScrollVerticalState();
	const scrolltotop = () => {
		const scrollInterval = setInterval(() => {
			if (window.scrollY > window.scrollY * 0.05) {
				window.scrollTo(0, window.scrollY - window.scrollY * 0.05);
			} else {
				clearInterval(scrollInterval);
			}
		}, 25);
	};

	return (
		<button
			className={`hidden lg:grid fixed right-[5%] bottom-[20%] w-[54px] h-[54px] text-[#ff9c00] border border-zinc-400 hover:text-[#ff9c00] rounded-md bg-transparent hover:duration-100 place-items-center ease-in duration-300 
            ${scroll > 500 ? "z-50 opacity-100" : "-z-50 opacity-0"}`}
			onClick={scrolltotop}
		>
			<ChevronUp className="" />
		</button>
	);
};

export default ScrollToTop;
