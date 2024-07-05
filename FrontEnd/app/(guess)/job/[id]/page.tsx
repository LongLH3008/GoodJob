"use client";
import { Button } from "@/components/ui/button";
import { SwrFetcher } from "@/lib/hooks/swr";
import {
	BriefcaseBusiness,
	ClipboardCopy,
	FlaskConical,
	HandCoins,
	History,
	Info,
	MapPin,
	MessageCircle,
	Star,
	UserRound,
	UserRoundSearch,
	Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";
import RelatedJobs from "./jobdetail.related";
import SkeletonProvider from "@/components/reuse/skeleton";
import { UserState } from "@/lib/hooks/user";
import SkeletonJobDetail from "./jobdetail.skeletion";

type Props = {};

const JobDetail = (props: Props) => {
	const { id } = useParams();
	const user_id = UserState().id;
	const { data, isLoading } = useSWR(`/recr/${id}`, SwrFetcher);
	const job = data?.metadata;

	return (
		<>
			{data && !isLoading ? (
				<div className="res_layout bg-gradient-to-b from-zinc-300 from-20% via-zinc-100 via-90% to-white py-10 lg:pb-24">
					<SkeletonProvider
						skeleton={<SkeletonJobDetail />}
						duration={1000}
						children={
							<>
								<div className="bg-white rounded-lg flex max-md:flex-col justify-between items-center p-5 gap-5 relative lg:pl-10">
									{job.recommended == "1" && (
										<Star
											color="#ff9c00"
											strokeWidth={1.75}
											size={24}
											className="absolute right-1 top-1"
										/>
									)}
									<div className="w-32 h-32 overflow-hidden grid place-items-center">
										<Image
											src={job.Company.avatar}
											width={100}
											height={100}
											className="w-full h-auto object-cover"
											alt={job.Company.name}
										/>
									</div>
									<div className="h-full md:w-5/6 flex flex-col gap-3 justify-between items-start">
										<div>
											<p className="text-xl">{job.job}</p>
											<Link
												href={`/company/${job.Company.slug}`}
												className="uppercase text-zinc-600 text-sm"
											>
												{job.Company.name}
											</Link>
										</div>
										<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 w-full gap-5 *:flex *:items-center *:gap-3 text-sm">
											<div className="">
												<span className=" w-8 h-8 grid place-items-center rounded-lg bg-gradient-to-br from-orange-500 text-white to-amber-200">
													<HandCoins size={20} strokeWidth={1.25} />{" "}
												</span>
												Salary: {job.salary}
											</div>
											<div className="">
												<span className=" w-8 h-8 grid place-items-center rounded-lg bg-gradient-to-br from-orange-500 text-white to-amber-200">
													<MapPin size={20} strokeWidth={1.25} />
												</span>
												Location: {job.location}
											</div>
											<div className="">
												<span className=" w-8 h-8 grid place-items-center rounded-lg bg-gradient-to-br from-orange-500 text-white to-amber-200">
													<History size={20} strokeWidth={1.25} />
												</span>
												Expired: {job.end.split(" ")[1]}
											</div>
										</div>
										<div className="sm:self-end flex items-center gap-3 max-sm:w-full max-sm:grid max-sm:grid-cols-1">
											{job?.Recruitment_Information.find(
												(item: any) =>
													item.CV?.applicant_id == user_id ||
													item.CV_import?.applicant_id == user_id
											) ? (
												<Link
													href={"/"}
													className="text-sm flex items-center gap-2 p-2 bg-orange-200 text-zinc-700 rounded-md h-full"
												>
													<Info size={16} strokeWidth={1.25} /> You
													already applied for this job and waiting
													for the response
												</Link>
											) : (
												<Button className="order-last text-center col-span-1 border hover:text-white border-zinc-400 text-primary hover:border-none bg-transparent hover_navlink gap-2">
													Apply
													<ClipboardCopy strokeWidth={1.25} />
												</Button>
											)}

											<Button className="text-center col-span-1 border hover:text-white border-zinc-400 bg-transparent text-primary gap-2">
												<MessageCircle strokeWidth={1.25} />
												Contact
											</Button>
										</div>
									</div>
								</div>
								<div className="grid grid-cols-1 lg:grid-cols-6 gap-y-5 lg:gap-5 py-5 *:rounded-lg">
									<div className="col-span-4 bg-white p-5 border-t-4 border-orange-400">
										<div className="border-b pb-10 mb-10">
											<p className="text-lg font-sans font-semibold text-orange-500 mb-5">
												Describe
											</p>
											{job.describe
												.split("\n")
												.map((item: string, index: number) => (
													<p
														className="text-sm text-zinc-600 text-justify lg:leading-7 lg:w-4/5"
														key={index}
													>
														{item.trim()}
													</p>
												))}
										</div>
										<div className="border-b pb-10 mb-10">
											<p className="text-lg font-sans font-semibold text-orange-500 my-5">
												Require
											</p>
											{job.require
												.split("\n")
												.map((item: string, index: number) => (
													<p
														className="text-sm text-zinc-600 text-justify lg:leading-7 lg:w-4/5"
														key={index}
													>
														{item.trim()}
													</p>
												))}
										</div>
										<div className="pb-10 mb-10">
											<p className="text-lg font-sans font-semibold text-orange-500 my-5">
												Benefits
											</p>
											{job.benefits
												.split("\n")
												.map((item: string, index: number) => (
													<p
														className="text-sm text-zinc-600 text-justify lg:leading-7 lg:w-4/5"
														key={index}
													>
														{item.trim()}
													</p>
												))}
										</div>
									</div>
									<div className="col-span-2 flex flex-col gap-5">
										<div className="bg-white p-5 border-t-4 border-zinc-500 rounded-lg flex flex-col gap-5 *:flex *:items-center *:gap-10 text-zinc-600">
											<p className="text-lg font-sans font-semibold text-zinc-700 mb-5">
												General
											</p>
											<div className="">
												<span className="w-9 h-9 grid place-items-center rounded-md bg-gradient-to-br from-primary to-zinc-500 text-white">
													<UserRound size={20} strokeWidth={2} />
												</span>
												<p className="text-[13px] font-semibold">
													Position: <br />
													<span className="text-[15px] font-normal">
														{job.position}
													</span>
												</p>
											</div>
											<div className="">
												<span className="w-9 h-9 grid place-items-center rounded-md bg-gradient-to-br from-primary to-zinc-500 text-white">
													<UserRoundSearch
														size={20}
														strokeWidth={2}
													/>
												</span>
												<p className="text-[13px] font-semibold">
													Slot: <br />
													<span className="text-[15px] font-normal">
														{job.slot}
													</span>
												</p>
											</div>
											<div className="">
												<span className="w-9 h-9 grid place-items-center rounded-md bg-gradient-to-br from-primary to-zinc-500 text-white">
													<FlaskConical size={20} strokeWidth={2} />
												</span>
												<p className="text-[13px] font-semibold">
													Experience: <br />
													<span className="text-[15px] font-normal">
														{job.exp}
													</span>
												</p>
											</div>
											<div className="">
												<span className="w-9 h-9 grid place-items-center rounded-md bg-gradient-to-br from-primary to-zinc-500 text-white">
													<BriefcaseBusiness
														size={20}
														strokeWidth={2}
													/>
												</span>
												<p className="text-[13px] font-semibold">
													Form of work: <br />
													<span className="text-[15px] font-normal">
														{job.work_format}
													</span>
												</p>
											</div>
											<div className="">
												<span className="w-9 h-9 grid place-items-center rounded-md bg-gradient-to-br from-primary to-zinc-500 text-white">
													<Users size={20} strokeWidth={2} />
												</span>
												<p className="text-[13px] font-semibold">
													CV Applied: <br />
													<span className="text-[15px] font-normal">
														{job.Recruitment_Information.length}
													</span>
												</p>
											</div>
										</div>
										<RelatedJobs profession={job.profession} id={job.id} />
									</div>
								</div>
							</>
						}
					/>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default JobDetail;
