import { Button } from "@/components/ui/button";
import { homereviews } from "@/lib/constants";
import Image from "next/image";
import React from "react";

type Props = {};

const HomeEmployer = (props: Props) => {
	return (
		<div className="res_layout">
			<div className="flex flex-col justify-center items-center gap-12 py-[5%]">
				<p className="text-xl">
					Thousands of potential <span className="text-[#ff9c00]">applicants</span> are awaiting
				</p>
				<div className="flex justify-center flex-wrap items-center gap-3">
					{Array.from({ length: homereviews.length }).map((_, index) => (
						<Image
							key={index}
							src={homereviews[index].avatar}
							width={50}
							height={50}
							className="rounded-full"
							alt="applicant"
						/>
					))}
					<div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-primary to-zinc-500 text-white text-center flex items-center justify-center">
						...
					</div>
				</div>
				<div className="text-sm w-full text-justify md:w-1/2 md:text-center font-light">
					Are you looking to hire the best talent for your organization? Look no further than
					GoodJob! Our platform hosts thousands of qualified candidates eagerly waiting to join
					dynamic teams like yours. With GoodJob, you'll find a diverse pool of applicants from
					various industries, each bringing unique skills and experiences to the table.
				</div>
				<Button className="p-6 rounded-full hover_navbtn">Post a Job Now</Button>
			</div>
		</div>
	);
};

export default HomeEmployer;
