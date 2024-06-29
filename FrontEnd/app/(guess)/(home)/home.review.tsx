import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { homereviews } from "@/lib/constants";
import Image from "next/image";

export function HomeReview() {
	const plugin = React.useRef(Autoplay({ delay: 10000, stopOnInteraction: false }));
	const plugin2 = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

	return (
		<div className="res_layout sm:my-5">
			<p className="text-2xl my-5 sm:text-center">
				People talk about <span className="text-[#ff9c00]">Us</span>
			</p>
			<Carousel plugins={[plugin.current]} className="w-full max-md:hidden">
				<CarouselContent className="w-full">
					{Array.from({ length: homereviews.length / 3 }).map((_, index) => (
						<CarouselItem
							key={index}
							className="transition-all duration-700 grid grid-cols-3 max-md:flex max-md:flex-col max-md:items-start"
						>
							<div className="p-1">
								<Card className="border-none">
									<CardContent className="flex items-center justify-center p-6">
										<div className="flex gap-3 items-start text-sm">
											<Image
												src={homereviews[index + 1 * 1].avatar}
												width={50}
												height={50}
												alt="index"
												className="rounded-full"
											/>
											<div className="font-semibold flex flex-col gap-1">
												<p>
													{homereviews[index + 1 * 1].name} <br />
												</p>
												<span className="text-[12px] font-normal border shadow-md rounded-xl rounded-tl-none px-3 py-2">
													{homereviews[index + 1 * 1].review}
												</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
							<div className="p-1">
								<Card className="border-none">
									<CardContent className="flex items-center justify-center p-6">
										<div className="flex gap-3 items-start text-sm">
											<Image
												src={homereviews[index + 1 * 2].avatar}
												width={50}
												height={50}
												alt="index"
												className="rounded-full"
											/>
											<div className="font-semibold flex flex-col gap-1">
												<p>
													{homereviews[index + 1 * 2].name} <br />
												</p>
												<span className="text-[12px] font-normal border shadow-md rounded-xl rounded-tl-none px-3 py-2">
													{homereviews[index + 1 * 2].review}
												</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
							<div className="p-1">
								<Card className="border-none">
									<CardContent className="flex items-center justify-center p-6">
										<div className="flex gap-3 items-start text-sm">
											<Image
												src={homereviews[index + 1 * 3].avatar}
												width={50}
												height={50}
												alt="index"
												className="rounded-full"
											/>
											<div className="font-semibold flex flex-col gap-1">
												<p>
													{homereviews[index + 1 * 3].name} <br />
												</p>
												<span className="text-[12px] font-normal border shadow-md rounded-xl rounded-tl-none px-3 py-2">
													{homereviews[index + 1 * 3].review}
												</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				{/* <CarouselPrevious />
				<CarouselNext /> */}
			</Carousel>
			<Carousel
				opts={{
					align: "start",
				}}
				plugins={[plugin2.current]}
				orientation="vertical"
				className="w-full md:hidden"
			>
				<CarouselContent className="-mt-1 h-[200px]">
					{Array.from(homereviews).map((_, index) => (
						<CarouselItem
							key={index}
							className="transition-all duration-500 grid grid-cols-3 max-md:flex max-md:flex-col max-md:items-start"
						>
							<div className="p-1">
								<Card className="border-none">
									<CardContent className="flex items-center justify-center p-6">
										<div className="flex gap-3 items-start text-sm">
											<Image
												src={homereviews[index].avatar}
												width={50}
												height={50}
												alt="index"
												className="rounded-full"
											/>
											<div className="font-semibold flex flex-col gap-1">
												<p>
													{homereviews[index].name} <br />
												</p>
												<span className="text-[12px] font-normal border shadow-md rounded-xl rounded-tl-none px-3 py-2">
													{homereviews[index].review}
												</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				{/* <CarouselPrevious />
				<CarouselNext /> */}
			</Carousel>
		</div>
	);
}
