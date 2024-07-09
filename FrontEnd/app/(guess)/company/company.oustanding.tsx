"use client";
import React, { useEffect, useState } from "react";
import { CompanySearchState } from "./state";
import SkeletonProvider from "@/components/reuse/skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardList, Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { SwrFetcher } from "@/lib/hooks/swr";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const OutsandingCompany = () => {
	const { isChange } = CompanySearchState();
	const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

	const { data } = useSWR("/outstanding_company", SwrFetcher);

	return (
		<div className={`${isChange && "hidden"}  res_layout bg-zinc-100 py-10`}>
			<p className="text-lg text-zinc-600 mb-5">Outstanding Company</p>
			<Carousel plugins={[plugin.current]} className={`w-full`}>
				<CarouselContent className="w-full">
					{data?.metadata.map((item: any) => (
						<CarouselItem key={item.id} className="md:basis-1/2 max-h-fit lg:basis-1/3">
							<SkeletonProvider
								skeleton={
									<div className="bg-white shadow-sm col-span-1 rounded-lg flex flex-col justify-between items-center p-10 max-sm:p-5 gap-3">
										<Skeleton className="w-28 h-28" />
										<Skeleton className="w-full h-6" />
										<Skeleton className="w-full h-28" />
									</div>
								}
								children={
									<div className="relative bg-white shadow-md col-span-1 rounded-lg flex flex-col justify-between items-center p-10 max-sm:p-5 gap-5 h-96">
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
												className="w-full h-auto object-cover"
											/>
										</Link>
										<Link
											href={`/company/${item.slug}`}
											className="text-zinc-700 uppercase text-sm text-center"
										>
											{item.name}
										</Link>
										<ScrollArea className="h-28 overflow-hidden text-[12px] text-zinc-500 text-justify snap-none">
											{item.introduce}
										</ScrollArea>
									</div>
								}
								duration={500}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	);
};

export default OutsandingCompany;
