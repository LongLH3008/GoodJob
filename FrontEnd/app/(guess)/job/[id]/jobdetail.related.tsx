import SkeletonProvider from "@/components/reuse/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { SwrFetcher } from "@/lib/hooks/swr";
import { Frown, History, MapPin, Scroll, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

type Props = {};

const RelatedJobs = ({ profession, id }: { id: string; profession: string }) => {
	const { data } = useSWR(`/recr?page=1&limit=4&profession=${profession}&id=${id}`, SwrFetcher);
	return (
		<div className="bg-white p-5 border-t-4 border-zinc-500 rounded-lg flex flex-col gap-5 *:flex *:items-center *:gap-10 text-zinc-600">
			<p className="text-lg font-sans font-semibold text-zinc-700 mb-5">Related Job</p>
			<ScrollArea className="max-h-96">
				{data?.recr_list.length > 0 ? (
					data?.recr_list.map((item: any) => (
						<SkeletonProvider
							key={item.id}
							skeleton={
								<div className="col-span-1 h-32 p-3 rounded-lg flex justify-between gap-4 items-center bg-white shadow-sm">
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
								<div className="relative col-span-1 h-32 p-3 rounded-lg flex flex-col gap-2 items-center bg-white shadow-sm">
									{item.recommended == "1" && (
										<Star
											color="#ff9c00"
											strokeWidth={3}
											size={16}
											className="absolute right-1 top-1"
										/>
									)}
									<div className="h-full w-full flex flex-col justify-between items-start">
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
					<div className="flex justify-center items-center text-sm">
						There is no related founded <Frown strokeWidth={1.25} size={22} />
					</div>
				)}
			</ScrollArea>
		</div>
	);
};

export default RelatedJobs;
