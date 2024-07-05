import { Skeleton } from "@/components/ui/skeleton";

const SkeletonJobDetail = () => {
	return (
		<>
			<div className="bg-white rounded-lg flex max-md:flex-col justify-between items-center p-5 gap-5 relative lg:pl-10">
				<Skeleton className="w-32 h-32" />
				<div className="h-full md:w-5/6 flex flex-col gap-3 justify-between items-start">
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-full" />
					<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 w-full gap-5 *:flex *:items-center *:gap-3 text-sm">
						<div className="">
							<Skeleton className="h-8 w-8 rounded-lg" />
							<Skeleton className="w-full" />
						</div>
						<div className="">
							<Skeleton className="h-8 w-8 rounded-lg" />
							<Skeleton className="w-full" />
						</div>{" "}
						<div className="">
							<Skeleton className="h-8 w-8 rounded-lg" />
							<Skeleton className="w-full" />
						</div>
					</div>
					<div className="sm:self-end flex items-center gap-3 max-sm:w-full max-sm:grid max-sm:grid-cols-1">
						<Skeleton className="w-14 h-4 col-span-1" />
						<Skeleton className="w-14 h-4 col-span-1" />
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-6 gap-y-5 lg:gap-5 py-5 *:rounded-lg">
				<div className="col-span-4 h-full flex flex-col gap-3 bg-white p-5 border-t-4 border-orange-400">
					<div className="w-full h-full flex flex-col gap-3">
						<Skeleton className="h-[32px] mb-5" />
						<Skeleton className="h-[32px]" />
						<Skeleton className="h-[32px]" />
						<Skeleton className="h-[32px]" />
					</div>
					<div className="w-full h-full flex flex-col gap-3">
						<Skeleton className="h-[32px] mb-5" />
						<Skeleton className="h-[32px]" />
						<Skeleton className="h-[32px]" />
						<Skeleton className="h-[32px]" />
					</div>
					<div className="w-full h-full flex flex-col gap-3">
						<Skeleton className="h-[32px] mb-5" />
						<Skeleton className="h-[32px]" />
						<Skeleton className="h-[32px]" />
						<Skeleton className="h-[32px]" />
					</div>
				</div>
				<div className="bg-white p-5 col-span-2 flex flex-col gap-5">
					<Skeleton className="h-[30px] mb-5" />
					<Skeleton className="h-[30px]" />
					<Skeleton className="h-[30px]" />
					<Skeleton className="h-[30px]" />
					<Skeleton className="h-[30px]" />
					<Skeleton className="h-[30px]" />
				</div>
			</div>
		</>
	);
};

export default SkeletonJobDetail;
