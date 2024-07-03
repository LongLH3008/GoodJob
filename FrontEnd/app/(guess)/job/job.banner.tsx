"use client";
import FilterSelect from "@/components/reuse/navbar.search.filter";
import { Input } from "@/components/ui/input";
import { FilterJob } from "@/lib/hooks/navbar_search.ui";
import * as constanst from "@/lib/constants";
import { CalendarDays, Gem, Newspaper, Search, Slash } from "lucide-react";
import React from "react";

type Props = {};

const JobBanner = (props: Props) => {
	const search = FilterJob();

	return (
		<div
			style={{ backgroundImage: "url('/banner_bg.png')" }}
			className="res_layout h-fit  bg-cover bg-fixed flex flex-col justify-center items-center gap-5 py-10 lg:py-5"
		>
			<p className="text-3xl text-center w-full font-sans ">
				Explore amazing <span className="text-[#ff9c00] font-semibold">career opportunities</span> with
				us!{" "}
			</p>
			<div className={`w-full`}>
				<div className="flex flex-col gap-3 w-full">
					<div className="grid grid-cols-4 gap-3 max-lg:text-sm max-lg:grid-cols-3 max-sm:grid-cols-2">
						<Input
							onChange={(e) => search.setFilter("job", e.target.value)}
							className="max-sm:col-span-2 border-none shadow-sm max-lg:col-span-3 col-span-2"
							type="text"
							value={search.dataFilter.job}
							placeholder="Type your favorite Job here"
						/>
						<FilterSelect
							data={constanst.profession}
							keyFilter="profession"
							className="col-span-1"
							label="profession"
						/>
						<FilterSelect
							data={constanst.position}
							keyFilter="position"
							className="col-span-1"
							label="position"
						/>
						<FilterSelect
							data={constanst.salary}
							keyFilter="salary"
							className="col-span-1"
							label="salary"
						/>
						<FilterSelect
							data={constanst.form}
							keyFilter="workform"
							className="col-span-1"
							label="Work Form"
						/>
						<FilterSelect
							data={constanst.location}
							keyFilter="location"
							className="col-span-1"
							label="location"
						/>
						<FilterSelect
							data={constanst.exp}
							keyFilter="exp"
							className="col-span-1"
							label="exp"
						/>
					</div>
					{/* <div className="w-full flex justify-center absolute -bottom-8">
						{!search.isChange ? (
							<Button
								onClick={() => search.toggleSearch()}
								className="hover:bg-primary hover:scale-110 hover:rotate-90 transition-all rounded-full h-16 shadow-3xl w-16"
							>
								<X strokeWidth={1.25} />
							</Button>
						) : (
							<>
								<Button
									onClick={() => search.resetFilter()}
									className="hover:bg-primary hover:scale-110 transition-all rounded-l-full h-16 w-16 shadow-3xl"
								>
									<RotateCcw strokeWidth={1.25} />
								</Button>
								<Link
									href={"/job"}
									className="flex items-center justify-center bg-primary text-white hover:bg-primary hover:scale-110 transition-all rounded-r-full h-16 w-16 shadow-3xl"
								>
									<Search strokeWidth={1.25} />
								</Link>
							</>
						)}
					</div> */}
				</div>
			</div>
			<div className="flex justify-between items-center w-1/2 text-sm max-2xl:w-3/4 max-md:w-full max-sm:hidden">
				<div className="flex items-center gap-3 bg-white shadow-md p-2 px-4 rounded-full">
					<CalendarDays className="text-[#ff9c00]" strokeWidth={1.25} />
					{new Date().toLocaleDateString("vi-VN")}
				</div>
				<Slash className="max-sm:hidden" strokeWidth={1} />
				<div className="flex items-center gap-3 bg-white shadow-md p-2 px-4 rounded-full">
					<Newspaper className="text-[#ff9c00]" strokeWidth={1.25} />
					2000 new jobs
				</div>
				<Slash className="max-sm:hidden" strokeWidth={1} />
				<div className="flex items-center gap-3 bg-white shadow-md p-2 px-4 rounded-full ">
					<Gem className="text-[#ff9c00]" strokeWidth={1.25} />
					2000 recommended
				</div>
			</div>
		</div>
	);
};

export default JobBanner;
