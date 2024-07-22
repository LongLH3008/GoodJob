"use client";
import SkeletonProvider from "@/components/reuse/skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { SwrFetcher } from "@/lib/hooks/swr";
import { UserState } from "@/lib/hooks/user";
import { Frown } from "lucide-react";
import React from "react";
import useSWR from "swr";
import { UploadCV } from "./cv.upload";
import CVItem from "./cv.item";
import Link from "next/link";

type apply = {
	id: string;
	mutate_key: string;
};

const CVList = ({ getUpload = false, apply }: { getUpload?: boolean; apply?: apply }) => {
	const { id } = UserState();
	const url = `/${getUpload ? "cv_import" : "cv"}?applicant_id=${id}`;
	const { data, mutate } = useSWR(url, SwrFetcher);
	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-between items-center">
				<p className={`text-zinc-600 mb-5 ${apply ? "text-sm" : "text-lg"}`}>
					{getUpload ? "Uploaded" : "Created"} CV
				</p>
				{!apply && <UploadCV mutate={mutate} />}
			</div>
			<SkeletonProvider
				duration={1200}
				skeleton={
					<div className="grid grid-cols-3 gap-5 *:min-h-24 *:bg-white *:shadow-xl *:p-2 *:rounded-lg *:flex *:flex-col *:justify-end *:gap-2 *:h-32">
						<div>
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
						</div>
						<div>
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
						</div>
						<div>
							<Skeleton className="h-6 w-full" />
							<Skeleton className="h-6 w-full" />
						</div>
					</div>
				}
			>
				{data?.length > 0 ? (
					<div className="grid grid-cols-3 gap-5  *:border">
						{data.map((item: any, index: number) => (
							<CVItem key={index} cv={item} apply_recr={apply} mutate={mutate} />
						))}
					</div>
				) : (
					<>
						<div className="w-full py-5 flex items-center justify-center gap-2 border border-zinc-500 text-sm text-zinc-500 rounded-md border-dashed">
							There are no cv uploaded
							<Frown strokeWidth={1.25} size={20} />
						</div>
					</>
				)}
			</SkeletonProvider>
		</div>
	);
};

export default CVList;
