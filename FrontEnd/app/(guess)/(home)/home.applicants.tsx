import React from "react";
import { ClipboardPaste, FileSearch, PencilLine } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {};

const HomeApplicant = (props: Props) => {
	return (
		<div className="res_layout max-lg:gap-5 gap-16 py-[10%] h-fit bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-start">
			<Image
				src={"/home_applicant.jpg"}
				width={100}
				height={100}
				alt="applicant"
				className="w-1/2 h-full max-lg:hidden block hover:scale-[0.9] transition-all"
			/>
			<div className="flex  gap-3 sm:justify-between h-full w-1/2 lg:flex-col max-lg:w-full max-lg:gap-10 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:grid-rows-2">
				<div className="text-4xl max-sm:text-2xl font-light">
					APPLY FOR YOUR <span className="font-semibold">DREAM JOB</span>
					<blockquote className="text-lg max-md:text-sm leading-5 mt-5">
						"Our mission is to connect people to jobs at scale. In order for businesses to hire
						the best talent, people deserve to easily find a job they want to do. Start applying
						to the 5,000+ companies in our network." <br />
						<br />
						<br />
						Start creating a profile to present to employers. Join over 100 million members
						worldwide on expert staffing arrangement. With over 2,000 offices & thousands of
						recruiters through overseas
						<br />
					</blockquote>
				</div>
				<ul className="text-lg uppercase *:border-b *:mt-5 *:py-5 *:border-primary *:cursor-pointer *:max-lg:mt-3 *:max-lg:py-3 max-lg:self-end max-lg:text-[12px] ">
					<li className="">
						<Link
							href={"/"}
							className="hover:text-[#ff9c00] hover:translate-x-2 transition-all flex gap-3"
						>
							<PencilLine strokeWidth={1.5} /> Write CV <br />
						</Link>
					</li>
					<li className="">
						<Link
							href={"/"}
							className="hover:text-[#ff9c00] hover:translate-x-2 transition-all flex gap-3"
						>
							<ClipboardPaste strokeWidth={1.5} /> Apply your CV
						</Link>
					</li>
					<li className="">
						<Link
							href={"/"}
							className="hover:text-[#ff9c00] hover:translate-x-2 transition-all flex gap-3"
						>
							<FileSearch strokeWidth={1.5} /> Find the favorite jobs
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default HomeApplicant;
