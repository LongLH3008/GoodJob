"use client";
import { SwrFetcher } from "@/lib/hooks/swr";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Building2, Cake, ClipboardList, MapPin, MessageCircle, Star, Users } from "lucide-react";
import ReviewCompany from "./detail.review";
import WriteReview from "./detail.write_review";
import { UserState } from "@/lib/hooks/user";
import SkeletonProvider from "@/components/reuse/skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { socket } from "@/lib/api/socket";
import Link from "next/link";
import CompanyList from "../company.list";
import ListJobs from "../../job/job.list";

type Props = {};

const DetailCompanyPage = (props: Props) => {
	const { id } = useParams();
	const { email } = UserState();
	const [review, setReview] = useState([]);

	useEffect(() => {
		socket.on("receiveReview", (data) => {
			setReview(data);
		});
	}, []);

	const { data } = useSWR(`/company/${id}`, SwrFetcher);
	const company = data?.metadata;

	return (
		<>
			{company && (
				<>
					<SkeletonProvider
						skeleton={
							<div className="res_layout py-10 bg-gradient-to-b from-orange-200 from-10% via-zinc-100 via-80% to-white">
								<div className="relative shadow-md rounded-lg p-2 lg:pl-10 w-full bg-white flex max-sm:flex-col justify-between items-center">
									<Skeleton className="w-32 h-32" />
									<div className="h-full md:w-5/6 flex flex-col gap-3 justify-between items-start max-sm:items-center">
										<Skeleton className="h-6 w-full" />
										<Skeleton className="h-6 w-full" />
										<div className="flex gap-2 w-full max-sm:flex-col max-sm:*:w-full justify-end items-center">
											<Skeleton className="w-12 h-6" />
											<Skeleton className="w-12 h-6" />
										</div>
									</div>
								</div>
								<div className="grid grid-cols-1 lg:grid-cols-6 gap-y-5 lg:gap-5 py-5 *:rounded-lg">
									<div className="shadow-md col-span-4 flex-col gap-5 bg-white p-5 border-t-4 border-orange-400 pb-10">
										<Skeleton className="h-12 w-full mb-5" />
										<Skeleton className="h-6 w-full" />
										<Skeleton className="h-6 w-full" />
										<Skeleton className="h-6 w-full" />
										<Skeleton className="h-6 w-full" />
										<Skeleton className="h-6 w-full" />
									</div>
									<div className="col-span-2 flex flex-col gap-5">
										<div className="shadow-md bg-white p-5 border-t-4 border-zinc-500 rounded-lg flex flex-col gap-5 *:flex *:items-center *:gap-10 text-zinc-600">
											<Skeleton className="h-6 w-full mb-5" />
											<Skeleton className="h-6 w-full" />
											<Skeleton className="h-6 w-full" />
											<Skeleton className="h-6 w-full" />
											<Skeleton className="h-6 w-full" />
										</div>
									</div>
								</div>
							</div>
						}
						duration={500}
						children={
							<div className="res_layout py-10 bg-gradient-to-b from-orange-200 from-10% via-zinc-100 via-80% to-zinc-100">
								<div className="relative shadow-md rounded-lg p-2 lg:pl-10 w-full bg-white flex max-sm:flex-col justify-between items-center">
									{company?.Reviews.length > 0 && (
										<span className="absolute right-1 top-1 bg-gradient-to-tr from-orange-200 from-2% via-orange-500 via-60% to-orange-200 flex items-center gap-1 rounded-md p-1 text-white">
											<Star strokeWidth={1.25} />{" "}
											{
												company.Reviews.filter(
													(item: any) =>
														item.vote == "Very_Good" ||
														item.vote == "Good"
												).length
											}
										</span>
									)}
									<div className="w-32 h-32 overflow-hidden grid place-items-center">
										<Image
											src={company?.avatar}
											width={100}
											height={100}
											className="w-full h-auto object-cover"
											alt={company?.name}
										/>
									</div>
									<div className="h-full md:w-5/6 flex flex-col gap-3 justify-between items-start max-sm:items-center">
										<p className="text-lg max-sm:text-center text-wrap lg:text-xl">
											{company?.name}
										</p>
										<p className="text-sm text-zinc-600 flex items-center gap-2">
											<MapPin strokeWidth={1.25} size={18} />{" "}
											{company?.address}
										</p>
										<div className="flex gap-2 w-full max-sm:flex-col max-sm:*:w-full justify-end items-center">
											{email !== "" ? (
												(review.length > 0 &&
													review.find(
														(item: any) =>
															item.User.email == email
													)) ||
												(company?.Reviews?.length &&
													company?.Reviews.find(
														(item: any) =>
															item.User.email == email
													)) ? (
													<p className="text-sm flex items-center gap-2 p-2 bg-orange-200 text-zinc-700 rounded-md h-full">
														You already review this company
													</p>
												) : (
													<WriteReview company_id={company?.id} />
												)
											) : (
												<Button className="p-0">
													<Link
														href={"/login"}
														className="px-3 py-2"
													>
														Login to review
													</Link>
												</Button>
											)}
											<Button className="text-center col-span-1 border hover:text-white border-zinc-400 bg-transparent text-primary gap-2">
												Contact with HR
												<MessageCircle strokeWidth={1} />
											</Button>
										</div>
									</div>
								</div>
								<div className="grid grid-cols-1 lg:grid-cols-6 gap-y-5 lg:gap-5 py-5 *:rounded-lg">
									<div className="shadow-md col-span-4 bg-white p-5 border-t-4 border-orange-400 pb-10">
										<Tabs defaultValue="introduce" className="w-full">
											<TabsList className="grid mb-8 w-2/3 grid-cols-2 p-0 *:px-0 *:flex *:justify-start bg-transparent">
												<TabsTrigger
													value="introduce"
													className="text-lg data-[state=active]:text-orange-400 font-sans font-semibold mb-5"
												>
													Introduce
												</TabsTrigger>
												<TabsTrigger
													value="reviews"
													className="text-lg data-[state=active]:text-orange-400 font-sans font-semibold mb-5"
												>
													Reviews (
													{review.length > 0
														? review.length
														: company?.Reviews.length}
													)
												</TabsTrigger>
											</TabsList>
											<TabsContent value="introduce">
												{company?.introduce
													.split("\n")
													.map((item: any, index: number) => (
														<p
															key={index}
															className="text-sm text-zinc-500 pr-5 text-justify"
														>
															{item !== "" ? item : <br />}
														</p>
													))}
											</TabsContent>
											<ReviewCompany
												review={
													review.length > 0
														? review
														: company?.Reviews
												}
											/>
										</Tabs>
									</div>
									<div className="col-span-2 min-h-full flex flex-col gap-5">
										<div className="shadow-md bg-white p-5 border-t-4 border-zinc-500 rounded-lg flex flex-col gap-5 *:flex *:items-center *:gap-10 text-zinc-600">
											<p className="text-lg font-sans font-semibold text-zinc-700 mb-5">
												General
											</p>
											<div className="">
												<span className="w-9 h-9 grid place-items-center rounded-md bg-gradient-to-br from-primary to-zinc-500 text-white">
													<Cake size={20} strokeWidth={2} />
												</span>
												<p className="text-[13px] font-semibold">
													Establish: <br />
													<span className="text-[15px] font-normal">
														{company?.establish}
													</span>
												</p>
											</div>
											<div className="">
												<span className="w-9 h-9 grid place-items-center rounded-md bg-gradient-to-br from-primary to-zinc-500 text-white">
													<Users size={20} strokeWidth={2} />
												</span>
												<p className="text-[13px] font-semibold">
													Employees: <br />
													<span className="text-[15px] font-normal">
														{company?.size} +
													</span>
												</p>
											</div>
											<div className="">
												<span className="w-9 h-9 grid place-items-center rounded-md bg-gradient-to-br from-primary to-zinc-500 text-white">
													<Building2 size={20} strokeWidth={2} />
												</span>
												<p className="text-[13px] font-semibold">
													Business: <br />
													<span className="text-[15px] font-normal">
														{company?.business}
													</span>
												</p>
											</div>
											<div className="">
												<span className="w-9 h-9 grid place-items-center rounded-md bg-gradient-to-br from-primary to-zinc-500 text-white">
													<ClipboardList
														size={20}
														strokeWidth={2}
													/>
												</span>
												<p className="text-[13px] font-semibold">
													Job: <br />
													<span className="text-[15px] font-normal">
														{company?.Recruitment.length}
													</span>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						}
					/>
					<div className="res_layout bg-zinc-100">
						<ListJobs company_id={company.id} />
					</div>
					<CompanyList business={company.business} />
				</>
			)}
		</>
	);
};

export default DetailCompanyPage;
