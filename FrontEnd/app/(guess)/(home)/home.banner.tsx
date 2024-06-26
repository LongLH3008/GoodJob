import Image from "next/image";
import React from "react";
import { Button } from "../../../components/ui/button";

type Props = {};

const HomeBanner = (props: Props) => {
	return (
		<div
			style={{ backgroundImage: "url('/banner_bg.png')" }}
			className="res_layout h-[87dvh] bg-cover bg-fixed flex items-center justify-between py-5"
		>
			<div className="flex flex-col max-lg:items-center max-lg:w-full gap-10 rounded-xl">
				<div
					style={{ textShadow: "0 2px 2px rgba(0, 0, 0, 0.5)" }}
					className="uppercase max-sm:text-center max-lg:text-4xl text-5xl 2xl:text-6xl text-primary font-light"
				>
					CONNECTING <span className="text-primary font-medium">APPLICANTS</span> <br /> WITH{" "}
					<span className="text-primary font-medium">EMPLOYERS</span>
				</div>
				<div className="flex gap-3">
					<Image
						src={"/favicon.svg"}
						width={50}
						height={50}
						alt="goodjob"
						className="-translate-y-1/2"
					/>
					<blockquote className="text-primary leading-5 max-lg:text-[11px] font-medium p-3 px-5 w-fit bg-white rounded-2xl rounded-tl-none">
						"APPLY FOR YOUR DREAM JOB <br />
						FIND POTENTIAL APPLICANTS FOR YOUR COMPANY <br />
						Let GoodJob help you !"
					</blockquote>
				</div>
				<Button className="w-1/3 py-8 rounded-md hover_navbtn max-md:px-24 max-lg:text-sm text-xl">
					Discover Now
				</Button>
			</div>
			<div className="relative w-3/12 h-2/3 shadow-sm max-lg:hidden">
				<div
					style={{ backgroundImage: "url('/homebanner.jpg')" }}
					className="absolute top-0 left-0 w-full h-full scale-[1.2] rounded-xl opacity-50 bg-cover"
				/>
				<div
					style={{ backgroundImage: "url('/homebanner.jpg')" }}
					className="w-full h-full rounded-xl relative bg-cover opacity-85"
				/>
			</div>
		</div>
	);
};

export default HomeBanner;
