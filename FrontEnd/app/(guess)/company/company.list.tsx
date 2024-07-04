"use client";
import React, { useEffect, useState } from "react";
import { CompanySearchState } from "./state";
import useSWR from "swr";
import { SwrFetcher } from "@/lib/hooks/swr";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ClipboardList, Star, User } from "lucide-react";
import Link from "next/link";
import SkeletonProvider from "@/components/reuse/skeleton";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const CompanyList = (props: Props) => {
	const { isChange } = CompanySearchState();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState("12");
	useEffect(() => {
		const a = () => {
			setLimit(window.innerWidth < 500 ? "4" : "12");
		};
		window.addEventListener("resize", a);
		return () => {
			window.removeEventListener("resize", a);
		};
	}, []);

	const nextPage = () => {
		if (page < Math.ceil(data?.metadata.total / parseInt(limit))) setPage(page + 1);
	};

	const previousPage = () => {
		if (page > 0) setPage(page - 1);
	};

	const { data } = useSWR(`/company?page=${page}&limit=${limit}`, SwrFetcher);

	return (
		<div
			className={`${
				isChange && "hidden"
			} res_layout bg-gradient-to-b from-zinc-100 from-80% to-white pb-10`}
		>
			<p className="text-lg text-zinc-600 py-10 border-t">Companies</p>
			<div className="grid grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1 gap-3">
				{data?.metadata.companies.map((item: any) => (
					<SkeletonProvider
						skeleton={
							<div className="bg-white shadow-sm col-span-1 rounded-lg flex flex-col justify-between items-center p-10 max-sm:p-5 gap-3">
								<Skeleton className="w-28 h-28" />
								<Skeleton className="w-full h-6" />
								<Skeleton className="w-full h-6" />
								<div className="w-full grid grid-cols-2 gap-2 *:text-left *:p-2 *:px-3 *:text-primary *:text-sm *:bg-zinc-200 *:rounded-md">
									<Skeleton className="w-full h-6" />
									<Skeleton className="w-full h-6" />
								</div>
							</div>
						}
						children={
							<div className="relative bg-white shadow-sm col-span-1 rounded-lg flex flex-col justify-between items-center p-10 max-sm:p-5 gap-3">
								{item._count.Reviews > 0 && (
									<span className="absolute right-1 top-1 bg-gradient-to-tr from-orange-200 from-2% via-orange-500 via-60% to-orange-200  rounded-md p-2 text-white grid place-items-center">
										<Star strokeWidth={1.25} />
									</span>
								)}

								<Link
									href={`/company/${item.slug}`}
									className="w-28 h-28 overflow-hidden grid place-items-center"
								>
									<Image
										src={item.avatar}
										width={100}
										height={100}
										alt={item.name}
										quality={75}
										className="w-full h-full object-cover"
									/>
								</Link>
								<Link
									href={`/company/${item.slug}`}
									className="text-zinc-700 uppercase text-sm text-center"
								>
									{item.name}
								</Link>
								<p className="text-sm">Business: {item.business}</p>
								<div className="w-full grid grid-cols-2 gap-2 *:text-left *:p-2 *:px-3 *:text-primary *:text-[12px] *:bg-zinc-100 *:rounded-md">
									<span className="text-sm flex gap-2">
										<User strokeWidth={1.25} size={16} /> Size: {item.size}
									</span>
									<span className="text-sm flex gap-2">
										<ClipboardList strokeWidth={1.25} size={16} />
										Jobs: {item._count.Recruitment}
									</span>
								</div>
							</div>
						}
						duration={500}
					/>
				))}
			</div>
			{Math.ceil(data?.metadata.total / parseInt(limit)) > 1 && (
				<div className="flex items-center justify-center gap-2 mt-3">
					<span
						onClick={() => previousPage()}
						className={`${
							page == 1 && "hidden"
						} text-zinc-500 w-8 h-8 rounded-lg grid place-items-center cursor-pointer shadow-md bg-white hover_navlink hover:text-white`}
					>
						<ChevronLeft size={18} strokeWidth={1.25} />
					</span>
					{Array.from({ length: Math.ceil(data?.metadata.total / parseInt(limit)) }).map(
						(_, index) => (
							<span
								key={index}
								onClick={() => setPage(index + 1)}
								className={`w-8 h-8 rounded-lg grid place-items-center cursor-pointer shadow-md
						${page == index + 1 ? "bg-gradient-to-br from-orange-500 to-orange-200 text-white" : "text-zinc-500 bg-white"}`}
							>
								{index + 1}
							</span>
						)
					)}
					<span
						onClick={() => nextPage()}
						className={`${
							page == Math.ceil(data?.metadata.total / parseInt(limit)) && "hidden"
						} text-zinc-500 w-8 h-8 rounded-lg grid place-items-center cursor-pointer shadow-md bg-white hover_navlink hover:text-white`}
					>
						<ChevronRight size={18} strokeWidth={1.25} />
					</span>
				</div>
			)}
		</div>
	);
};

export default CompanyList;
