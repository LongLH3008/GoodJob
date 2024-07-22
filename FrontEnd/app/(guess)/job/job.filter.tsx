"use client";
import SkeletonProvider from "@/components/reuse/skeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FilterJob } from "@/app/(guess)/job/state";
import { SwrFetcher } from "@/lib/hooks/swr";
import { ChevronLeft, ChevronRight, FilterX, Frown, History, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

type Props = {};

const ResultFilterJobs = (props: Props) => {
	const [page, setPage] = useState(1);
	const { job, profession, position, salary, workform, location, exp } = FilterJob().dataFilter;
	const { resetFilter, isChange } = FilterJob();
	let filter = `
	${job !== "" ? "&job=" + job : ""}
	${profession !== "" ? "&profession=" + profession : ""}
	${position !== "" ? "&position=" + position : ""}
	${salary !== "" ? "&salary=" + salary : ""}
	${workform !== "" ? "&work_format=" + workform : ""}
	${location !== "" ? "&location=" + location : ""}
	${exp !== "" ? "&exp=" + exp : ""}
	`;

	const [limit, setLimit] = useState("6");
	useEffect(() => {
		const a = () => {
			setLimit(window.innerWidth < 500 ? "4" : "6");
		};
		window.addEventListener("resize", a);
		return () => {
			window.removeEventListener("resize", a);
		};
	}, []);

	const nextPage = () => {
		if (page < Math.ceil(data?.total / parseInt(limit))) setPage(page + 1);
	};

	const previousPage = () => {
		if (page > 0) setPage(page - 1);
	};

	const { data } = useSWR(`/recr?page=${page}&order=desc&limit=${limit}${filter}`, SwrFetcher);
	return (
		<div className={`py-10 ${isChange ? "block" : "hidden"} `}>
			<div className="w-full flex justify-between items-center mb-5">
				<p className="text-lg font-normal font-sans my-3">Search results ({data?.total ?? 0})</p>
				<span
					className="hover_navbtn bg-primary w-10 h-10 rounded-md text-white grid place-items-center cursor-pointer"
					onClick={() => resetFilter()}
				>
					<FilterX strokeWidth={1.25} />
				</span>
			</div>
			<div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2 max-[700px]:grid-cols-1">
				{data?.recr_list.length > 0 ? (
					data?.recr_list.map((item: any) => (
						<SkeletonProvider
							key={item.id}
							skeleton={
								<div className="col-span-1 h-32 p-3 rounded-lg flex justify-between gap-4 items-center bg-white shadow-md">
									<Skeleton className="w-[100px] h-[100px]" />
									<div className="h-full w-3/4 flex flex-col justify-between items-start">
										<div className="leading-4 w-full">
											<Skeleton className="p-2 w-full mb-1" />
											<Skeleton className="p-1 w-full" />
										</div>
										<Skeleton className="p-2 w-[80%]" />
										<div className="grid grid-cols-2 gap-2 w-full *:text-[12px] *:flex *:gap-2 *:items-center *:col-span-1 *:text-left *:p-1 *:px-2">
											<Skeleton className="h-2" />
											<Skeleton className="h-2" />
										</div>
									</div>
								</div>
							}
							children={
								<div className="relative col-span-1 h-32 p-3 rounded-lg flex justify-between gap-4 items-center bg-white shadow-md">
									{item.recommended == "1" && (
										<Star
											color="#ff9c00"
											strokeWidth={3}
											size={16}
											className="absolute right-1 top-1"
										/>
									)}
									<Link
										href={`/job/${item.slug}`}
										className="w-[100px] h-[100px] overflow-hidden flex items-center justify-center"
									>
										<Image
											src={item.Company.avatar}
											width={100}
											height={100}
											className="w-full h-auto object-cover"
											alt="c"
										/>
									</Link>
									<div className="h-full w-3/4 flex flex-col justify-between items-start">
										<Link
											href={`/job/${item.slug}`}
											className="leading-4 text-sm"
										>
											{item.job} <br />{" "}
											<span className="text-[11px] uppercase text-zinc-500">
												{item.Company.name}
											</span>
										</Link>
										<span className="text-[12px]">{item.salary}</span>
										<div className="grid grid-cols-2 gap-2 w-full *:text-[12px] *:flex *:gap-2 *:items-center *:col-span-1 *:text-left *:p-1">
											<span className="bg-zinc-200 text-zinc-700">
												<MapPin size={14} strokeWidth={1.25} />
												{item.location}
											</span>
											<span className="bg-zinc-200 text-zinc-700">
												<History size={14} strokeWidth={1.25} />
												{item.end}
											</span>
										</div>
									</div>
								</div>
							}
							duration={1000}
						/>
					))
				) : (
					<div className="h-[30vh] flex items-center justify-center gap-2 w-full col-span-3 bg-white rounded-xl text-zinc-400">
						There is no result founded <Frown />
					</div>
				)}
			</div>
			{Math.ceil(data?.total / parseInt(limit)) > 1 && (
				<div className="flex items-center justify-center gap-2 mt-3">
					<span
						onClick={() => previousPage()}
						className={`${
							page == 1 && "hidden"
						} text-zinc-500 w-8 h-8 rounded-lg grid place-items-center cursor-pointer shadow-md bg-white hover_navlink hover:text-white`}
					>
						<ChevronLeft size={18} strokeWidth={1.25} />
					</span>
					{Array.from({ length: Math.ceil(data?.total / parseInt(limit)) }).map((_, index) => (
						<span
							key={index}
							onClick={() => setPage(index + 1)}
							className={`w-8 h-8 rounded-lg grid place-items-center cursor-pointer shadow-md
						${page == index + 1 ? "bg-gradient-to-br from-orange-500 to-orange-200 text-white" : "text-zinc-500 bg-white"}`}
						>
							{index + 1}
						</span>
					))}
					<span
						onClick={() => nextPage()}
						className={`${
							page == Math.ceil(data?.total / parseInt(limit)) && "hidden"
						} text-zinc-500 w-8 h-8 rounded-lg grid place-items-center cursor-pointer shadow-md bg-white hover_navlink hover:text-white`}
					>
						<ChevronRight size={18} strokeWidth={1.25} />
					</span>
				</div>
			)}
		</div>
	);
};

export default ResultFilterJobs;
