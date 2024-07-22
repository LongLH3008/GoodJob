import { OpenApply } from "@/app/(guess)/job/[id]/jobdetail.apply";
import { applyCv, deleteCv } from "@/lib/api/cv";
import { Eye, Lock, LockOpen, Pencil, Trash2, UnplugIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { MutatorOptions, mutate as refetch } from "swr";
const CVItem = ({
	cv,
	apply_recr,
	mutate,
}: {
	cv: any;
	apply_recr?: { id: string; mutate_key: string };
	mutate(data?: any, opts?: boolean | MutatorOptions<any, any> | undefined): Promise<any>;
}) => {
	const convertDate = (date: string) => {
		return new Date(date).toLocaleTimeString() + " - " + new Date(date).toLocaleDateString();
	};
	const { setOpen } = OpenApply();

	const remove = async (cv_id: string, applicant_id: string) => {
		try {
			let checkUpload = cv.file ? true : false;
			await mutate(deleteCv(cv_id, applicant_id, checkUpload), {
				optimisticData: (data: any) => {
					return data.filter((item: any) => {
						return item.id !== cv_id;
					});
				},
				populateCache: (emptyResponseObj, currentCache) => {
					return currentCache.filter((item: any) => {
						return item.id !== cv_id;
					});
				},
			});
		} catch (error: any) {
			const { toast } = await import("@/components/ui/use-toast");
			toast({
				title: "Delete Cv failed",
				description: error.response
					? error.response.data
					: "Could not connect to server. Please try again later",
				duration: 3500,
				action: error.response ? (
					<Lock strokeWidth={1.25} className="text-red-500" />
				) : (
					<UnplugIcon strokeWidth={1.25} className="text-red-500" />
				),
			});
		}
	};

	const applyJob = async (cv_id: string, recr_id: string) => {
		const { toast } = await import("@/components/ui/use-toast");
		try {
			await applyCv(cv_id, recr_id, cv.file ? "import" : "create");
			toast({
				title: `Apply cv success`,
				description: `Your CV has been sent to the employer`,
				action: <p>✅</p>,
				duration: 5000,
			});
			refetch(apply_recr?.mutate_key);
			setOpen(false);
		} catch (error: any) {
			toast({
				title: "Apply Cv failed",
				description: error.response
					? error.response.data
					: "Could not connect to server. Please try again later",
				duration: 3500,
				action: error.response ? (
					<Lock strokeWidth={1.25} className="text-red-500" />
				) : (
					<UnplugIcon strokeWidth={1.25} className="text-red-500" />
				),
			});
		}
	};

	return (
		<div className="bg-white shadow-xl p-2 rounded-lg border-none flex flex-col">
			<div className={`flex justify-between items-center gap-2 *:cursor-pointer`}>
				{!apply_recr ? (
					<>
						<span
							onClick={() => remove(cv.id, cv.applicant_id)}
							className="p-2 rounded-full hover:bg-red-500 duration-300 ease-in hover:text-white"
						>
							<Trash2 size={20} strokeWidth={1} />
						</span>
						<div className="flex gap-2">
							<Link
								href={`/cv/edit/${cv.id}`}
								className="p-2 rounded-full hover:bg-orange-400 duration-300 ease-in hover:text-white"
							>
								<Pencil size={20} strokeWidth={1} />
							</Link>
							<Link
								href={`/cv/${cv.id}`}
								target="_blank"
								className="p-2 rounded-full hover:bg-primary duration-300 ease-in hover:text-white"
							>
								<Eye size={20} strokeWidth={1} />
							</Link>
						</div>
					</>
				) : (
					<span
						onClick={() => applyJob(cv.id, apply_recr.id)}
						className="p-2 rounded-md bg-orange-300 text-sm text-white"
					>
						Choose
					</span>
				)}
			</div>
			<div className="mt-5">
				<p className={`${apply_recr ? "text-sm" : "text-[16px]"}`}>{cv.name}</p>
				<p className={`${apply_recr ? "text-[12px]" : "text-sm"}`}>
					Last update {convertDate(cv.updateAt ? cv.updateAt : cv.createAt)}
				</p>
			</div>
		</div>
	);
};

export default CVItem;
