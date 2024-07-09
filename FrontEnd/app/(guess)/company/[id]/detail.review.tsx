import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Angry, Frown, Meh, MessageSquareText, Send, Smile, SmilePlus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { socket } from "@/lib/api/socket";

const Emotions = ({ vote }: { vote: string }) => {
	switch (vote) {
		case "Very_Good":
			return (
				<span className="flex items-start gap-2 font-semibold">
					<SmilePlus className="text-amber-500" size={22} strokeWidth={1.25} />
					<p className="bg-gradient-to-tr from-amber-300 to-orange-500 bg-clip-text text-transparent">
						Very Good
					</p>
				</span>
			);
		case "Good":
			return (
				<span className="flex items-start gap-2 font-semibold text-lime-500">
					<Smile size={22} strokeWidth={1.25} />
					<p className="">{vote}</p>
				</span>
			);
		case "Average":
			return (
				<span className="flex items-start gap-2 font-semibold text-green-600">
					<Meh size={22} strokeWidth={1.25} />
					<p className="">{vote}</p>
				</span>
			);
		case "Poor":
			return (
				<span className="flex items-start gap-2 font-semibold text-fuchsia-700">
					<Frown size={22} strokeWidth={1.25} />
					<p className="">{vote}</p>
				</span>
			);
		case "Terrible":
			return (
				<span className="flex items-start gap-2 font-semibold">
					<Angry className="text-red-500" size={22} strokeWidth={1.25} />
					<p className="bg-red-500 bg-clip-text text-transparent">{vote}</p>
				</span>
			);
	}
};

const ReviewCompany = ({ review }: { review: any }) => {
	console.log(review);

	return (
		<TabsContent value="reviews">
			<Tabs defaultValue="all" className="border-t -mt-5 pt-5">
				<TabsList className="grid grid-cols-6 mb-8 w-full *:text-sm *:gap-2 gap-2  p-0 *:border *:px-0 *:flex *:justify-start max-lg:*:justify-center bg-transparent">
					<TabsTrigger
						value="all"
						className="text-lg data-[state=active]:text-orange-400 font-sans font-semibold mb-5 border-none outline-none ring-0"
					>
						<MessageSquareText size={22} strokeWidth={1.25} />
						<p>All</p>
					</TabsTrigger>
					<TabsTrigger
						value="Terrible"
						className="text-lg data-[state=active]:text-orange-400 font-sans font-semibold mb-5 border-none outline-none ring-0"
					>
						<Angry size={22} strokeWidth={1.25} />
						<p className="max-lg:hidden">Terrible</p>
					</TabsTrigger>
					<TabsTrigger
						value="Poor"
						className="text-lg data-[state=active]:text-orange-400 font-sans font-semibold mb-5 border-none outline-none ring-0"
					>
						<Frown size={22} strokeWidth={1.25} />
						<p className="max-lg:hidden">Poor</p>
					</TabsTrigger>
					<TabsTrigger
						value="Average"
						className="text-lg data-[state=active]:text-orange-400 font-sans font-semibold mb-5 border-none outline-none ring-0"
					>
						<Meh size={22} strokeWidth={1.25} />
						<p className="max-lg:hidden">Average</p>
					</TabsTrigger>
					<TabsTrigger
						value="Good"
						className="text-lg data-[state=active]:text-orange-400 font-sans font-semibold mb-5 border-none outline-none ring-0"
					>
						<Smile size={22} strokeWidth={1.25} />
						<p className="max-lg:hidden">Good</p>
					</TabsTrigger>
					<TabsTrigger
						value="Very_Good"
						className="text-lg data-[state=active]:text-orange-400 font-sans font-semibold mb-5 border-none outline-none ring-0"
					>
						<SmilePlus size={22} strokeWidth={1.25} />
						<p className="max-lg:hidden">Very Good</p>
					</TabsTrigger>
				</TabsList>
				<TabsContent value="all">
					<ScrollArea className="max-h-[500px]">
						{review?.length > 0 ? (
							review?.map((item: any, index: number) => (
								<div
									key={index}
									className="text-sm text-zinc-500 pr-5 text-justify flex gap-3 items-start mb-5"
								>
									<div className="h-9 w-9 overflow-hidden flex justify-center items-center rounded-full">
										<Image
											src={
												item.User.User_Information.length &&
												item.User.User_Information[0].avatar !== ""
													? item.User.User_Information[0].avatar
													: "/user.png"
											}
											width={100}
											height={100}
											className="w-full h-auto object-cover"
											alt={item.User.email}
										/>
									</div>
									<div className="flex w-[90%] gap-3 items-start text-sm">
										<div className="font-semibold flex flex-col gap-1">
											<p> {item.User.email.split("@")[0]}</p>
											<div className="text-[14px] min-w-[300px]  relative font-normal border flex flex-col items-start justify-between gap-1 shadow-md rounded-xl rounded-tl-none p-3 pb-8 min-h-14">
												<Emotions vote={item.vote} />
												<span className="w-11/12 text-[12px] text-left">
													{item.content}
												</span>
												<span className="text-[10px] absolute bottom-1 right-2">
													Reviewed at
													{new Date(
														item.createAt
													).toLocaleTimeString() +
														" " +
														new Date(
															item.createAt
														).toLocaleDateString()}
												</span>
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<p className="w-full rounded-xl h-32 text-sm text-gray-500 grid place-items-center shadow-sm border">
								There are no review founded
							</p>
						)}
					</ScrollArea>
				</TabsContent>
				<TabsContent value="Very_Good">
					{review?.filter((item: any) => item.vote == "Very_Good").length > 0 ? (
						review
							?.filter((item: any) => item.vote == "Very_Good")
							.map((item: any, index: number) => (
								<div
									key={index}
									className="text-sm text-zinc-500 pr-5 text-justify flex gap-3 items-start mb-5"
								>
									<div className="h-9 w-9 overflow-hidden flex justify-center items-center rounded-full">
										<Image
											src={
												item.User.User_Information.length &&
												item.User.User_Information[0].avatar !== ""
													? item.User.User_Information[0].avatar
													: "/user.png"
											}
											width={100}
											height={100}
											className="w-full h-auto object-cover"
											alt={item.User.email}
										/>
									</div>
									<div className="flex w-[90%] gap-3 items-start text-sm">
										<div className="font-semibold flex flex-col gap-1">
											<p> {item.User.email.split("@")[0]}</p>
											<div className="text-[14px] min-w-[300px]  relative font-normal border flex flex-col items-start justify-between gap-1 shadow-md rounded-xl rounded-tl-none p-3 pb-8 min-h-14">
												<span className="w-11/12 text-[12px] text-left">
													{item.content}
												</span>
												<span className="text-[10px] absolute bottom-1 right-2">
													Reviewed at
													{new Date(
														item.createAt
													).toLocaleTimeString() +
														" " +
														new Date(
															item.createAt
														).toLocaleDateString()}
												</span>
											</div>
										</div>
									</div>
								</div>
							))
					) : (
						<p className="w-full rounded-xl h-32 text-sm text-gray-500 grid place-items-center shadow-sm border">
							There are no review founded
						</p>
					)}
				</TabsContent>
				<TabsContent value="Good">
					{review?.filter((item: any) => item.vote == "Good").length > 0 ? (
						review
							?.filter((item: any) => item.vote == "Good")
							.map((item: any, index: number) => (
								<div
									key={index}
									className="text-sm text-zinc-500 pr-5 text-justify flex gap-3 items-start mb-5"
								>
									<div className="h-9 w-9 overflow-hidden flex justify-center items-center rounded-full">
										<Image
											src={
												item.User.User_Information.length &&
												item.User.User_Information[0].avatar !== ""
													? item.User.User_Information[0].avatar
													: "/user.png"
											}
											width={100}
											height={100}
											className="w-full h-auto object-cover"
											alt={item.User.email}
										/>
									</div>
									<div className="flex w-[90%] gap-3 items-start text-sm">
										<div className="font-semibold flex flex-col gap-1">
											<p> {item.User.email.split("@")[0]}</p>
											<div className="text-[14px] min-w-[300px]  relative font-normal border flex flex-col items-start justify-between gap-1 shadow-md rounded-xl rounded-tl-none p-3 pb-8 min-h-14">
												<span className="w-11/12 text-[12px] text-left">
													{item.content}
												</span>
												<span className="text-[10px] absolute bottom-1 right-2">
													Reviewed at
													{new Date(
														item.createAt
													).toLocaleTimeString() +
														" " +
														new Date(
															item.createAt
														).toLocaleDateString()}
												</span>
											</div>
										</div>
									</div>
								</div>
							))
					) : (
						<p className="w-full rounded-xl h-32 text-sm text-gray-500 grid place-items-center shadow-sm border">
							There are no review founded
						</p>
					)}
				</TabsContent>
				<TabsContent value="Average">
					{review?.filter((item: any) => item.vote == "Average").length > 0 ? (
						review
							?.filter((item: any) => item.vote == "Average")
							.map((item: any, index: number) => (
								<div
									key={index}
									className="text-sm text-zinc-500 pr-5 text-justify flex gap-3 items-start mb-5"
								>
									<div className="h-9 w-9 overflow-hidden flex justify-center items-center rounded-full">
										<Image
											src={
												item.User.User_Information.length &&
												item.User.User_Information[0].avatar !== ""
													? item.User.User_Information[0].avatar
													: "/user.png"
											}
											width={100}
											height={100}
											className="w-full h-auto object-cover"
											alt={item.User.email}
										/>
									</div>
									<div className="flex w-[90%] gap-3 items-start text-sm">
										<div className="font-semibold flex flex-col gap-1">
											<p> {item.User.email.split("@")[0]}</p>
											<div className="text-[14px] min-w-[300px]  relative font-normal border flex flex-col items-start justify-between gap-1 shadow-md rounded-xl rounded-tl-none p-3 pb-8 min-h-14">
												<span className="w-11/12 text-[12px] text-left">
													{item.content}
												</span>
												<span className="text-[10px] absolute bottom-1 right-2">
													Reviewed at
													{new Date(
														item.createAt
													).toLocaleTimeString() +
														" " +
														new Date(
															item.createAt
														).toLocaleDateString()}
												</span>
											</div>
										</div>
									</div>
								</div>
							))
					) : (
						<p className="w-full rounded-xl h-32 text-sm text-gray-500 grid place-items-center shadow-sm border">
							There are no review founded
						</p>
					)}
				</TabsContent>
				<TabsContent value="Poor">
					{review?.filter((item: any) => item.vote == "Poor").length > 0 ? (
						review
							?.filter((item: any) => item.vote == "Poor")
							.map((item: any, index: number) => (
								<div
									key={index}
									className="text-sm text-zinc-500 pr-5 text-justify flex gap-3 items-start mb-5"
								>
									<div className="h-9 w-9 overflow-hidden flex justify-center items-center rounded-full">
										<Image
											src={
												item.User.User_Information.length &&
												item.User.User_Information[0].avatar !== ""
													? item.User.User_Information[0].avatar
													: "/user.png"
											}
											width={100}
											height={100}
											className="w-full h-auto object-cover"
											alt={item.User.email}
										/>
									</div>
									<div className="flex w-[90%] gap-3 items-start text-sm">
										<div className="font-semibold flex flex-col gap-1">
											<p> {item.User.email.split("@")[0]}</p>
											<div className="text-[14px] min-w-[300px]  relative font-normal border flex flex-col items-start justify-between gap-1 shadow-md rounded-xl rounded-tl-none p-3 pb-8 min-h-14">
												<span className="w-11/12 text-[12px] text-left">
													{item.content}
												</span>
												<span className="text-[10px] absolute bottom-1 right-2">
													Reviewed at
													{new Date(
														item.createAt
													).toLocaleTimeString() +
														" " +
														new Date(
															item.createAt
														).toLocaleDateString()}
												</span>
											</div>
										</div>
									</div>
								</div>
							))
					) : (
						<p className="w-full rounded-xl h-32 text-sm text-gray-500 grid place-items-center shadow-sm border">
							There are no review founded
						</p>
					)}
				</TabsContent>
				<TabsContent value="Terrible">
					{review?.filter((item: any) => item.vote == "Terrible").length > 0 ? (
						review
							?.filter((item: any) => item.vote == "Terrible")
							.map((item: any, index: number) => (
								<div
									key={index}
									className="text-sm text-zinc-500 pr-5 text-justify flex gap-3 items-start mb-5"
								>
									<div className="h-9 w-9 overflow-hidden flex justify-center items-center rounded-full">
										<Image
											src={
												item.User.User_Information.length &&
												item.User.User_Information[0].avatar !== ""
													? item.User.User_Information[0].avatar
													: "/user.png"
											}
											width={100}
											height={100}
											className="w-full h-auto object-cover"
											alt={item.User.email}
										/>
									</div>
									<div className="flex w-[90%] gap-3 items-start text-sm">
										<div className="font-semibold flex flex-col gap-1">
											<p> {item.User.email.split("@")[0]}</p>
											<div className="text-[14px] min-w-[300px]  relative font-normal border flex flex-col items-start justify-between gap-1 shadow-md rounded-xl rounded-tl-none p-3 pb-8 min-h-14">
												<span className="w-11/12 text-[12px] text-left">
													{item.content}
												</span>
												<span className="text-[10px] absolute bottom-1 right-2">
													Reviewed at
													{new Date(
														item.createAt
													).toLocaleTimeString() +
														" " +
														new Date(
															item.createAt
														).toLocaleDateString()}
												</span>
											</div>
										</div>
									</div>
								</div>
							))
					) : (
						<p className="w-full rounded-xl h-32 text-sm text-gray-500 grid place-items-center shadow-sm border">
							There are no review founded
						</p>
					)}
				</TabsContent>
			</Tabs>
		</TabsContent>
	);
};

export default ReviewCompany;
