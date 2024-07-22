"use client";
import CVList from "@/app/(applicant)/cv/cv.list";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ClipboardCopy, X } from "lucide-react";
import Link from "next/link";
import { create } from "zustand";

type props = {
	open: boolean;
	setOpen: (bool: boolean) => void;
};

type apply = {
	id: string;
	mutate_key: string;
};

export const OpenApply = create<props>((set) => ({
	open: false,
	setOpen: (bool: boolean) => set({ open: bool }),
}));

export function ApplyJob({ recr }: { recr: apply }) {
	const { open, setOpen } = OpenApply();

	return (
		<Dialog open={open}>
			<DialogTrigger asChild>
				<Button
					onClick={() => {
						setOpen(true);
					}}
					className="order-last text-center col-span-1 border hover:text-white border-zinc-400 text-primary hover:border-orange-400 bg-transparent hover_navlink gap-2"
				>
					Apply
					<ClipboardCopy strokeWidth={1.25} />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[800px]">
				<DialogHeader className="relative">
					<span
						className="cursor-pointer absolute -right-2 -top-1 p-2 hover:bg-zinc-100"
						onClick={() => setOpen(false)}
					>
						<X strokeWidth={1.25} size={20} />
					</span>
					<DialogTitle>Choose CV to apply</DialogTitle>
				</DialogHeader>
				<CVList apply={recr} />
				<hr />
				<CVList getUpload apply={recr} />
				<hr />
				<Link
					href={"/cv"}
					className="text white hover_navbtn text-white bg-primary rounded-md text-sm w-fit px-3 py-2 justify-self-end"
				>
					Go to Manage Cv
				</Link>
				<DialogFooter></DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
