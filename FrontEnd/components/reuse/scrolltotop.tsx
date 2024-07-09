"use client";
import { ScrollVerticalState } from "@/lib/hooks/scroll_vertical.ui";
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
			className={`hover:shadow-2xl hover:shadow-current hover:bg-white grid fixed right-[5%] bottom-[20%] w-9 h-9 lg:w-[54px] lg:h-[54px] text-[#ff9c00] border border-zinc-300 hover:text-[#ff9c00] rounded-full bg-transparent hover:duration-100 place-items-center ease-in 
            ${scroll > 500 ? "z-50 opacity-100" : "-z-50 opacity-0"}`}
			onClick={scrolltotop}
		>
			<ChevronUp className="text-sm" />
		</button>
	);
};

export default ScrollToTop;
