import Field from "@/components/reuse/field";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { uploadCv } from "@/lib/api/cv";
import { handleUpload } from "@/lib/hooks/useCloudinary";
import { UserState } from "@/lib/hooks/user";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Lock, Plus, UnplugIcon, UserCheck, X } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MutatorOptions } from "swr";

const schema = Joi.object({
	name: Joi.string().required(),
});

export function UploadCV({
	mutate,
}: {
	mutate(data?: any, opts?: boolean | MutatorOptions<any, any> | undefined): Promise<any>;
}) {
	const { id } = UserState();
	const [err, setErr] = useState("");
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("Click to upload or drag and drop");

	const fileRef = useRef<HTMLInputElement>(null);
	const form = useForm({ resolver: joiResolver(schema) });

	const log = (e: any) => {
		const allowType = ["jpg", "png", "pdf", "docx"];
		const selectedFile = e.target.files[0];
		const check = selectedFile.name.split(".");
		if (!allowType.includes(check[check?.length - 1])) {
			setErr(`File invallid (.${check[check?.length - 1]})`);
			return;
		} else {
			setErr("");
			setName(e.target.files[0].name);
		}
	};

	const uploadFileCv = async (formdata: any) => {
		const { toast } = await import("@/components/ui/use-toast");

		try {
			await mutate(uploadCv(formdata), {
				optimisticData: (data: any[]) => (!data || !data.length ? [formdata] : [...data, formdata]),
				populateCache: (responseObj, currentCache) => [...currentCache, responseObj],
				rollbackOnError: true,
				revalidate: false,
			});

			toast({
				description: `Upload Cv successfully`,
				action: <UserCheck strokeWidth={1.25} color="#ff9c00" />,
				duration: 5000,
			});
			setName("Click to upload or drag and drop");
			setOpen(false);
		} catch (error: any) {
			console.log(error);
			toast({
				title: "Upload Cv failed",
				description: error.response.data
					? error.response.data
					: "Could not connect to server. Please try again later",
				duration: 3500,
				action: error.response ? (
					<p>{"❌"}</p>
				) : (
					// <Lock strokeWidth={1.25} className="text-red-500" />
					<UnplugIcon strokeWidth={1.25} className="text-red-500" />
				),
			});
		}
	};

	const onSubmit = async (formdata: any) => {
		if (fileRef.current?.files) {
			const file = fileRef.current.files[0];
			const upload = await handleUpload(file);
			formdata.file = upload?.src.replace("http", "https");
			formdata.applicant_id = id;
			uploadFileCv(formdata);
		} else {
			setErr("File required");
		}
	};

	return (
		<Form {...form}>
			<Dialog open={open}>
				<DialogTrigger asChild>
					<Button
						onClick={() => {
							setOpen(true);
							setName("Click to upload or drag and drop");
						}}
						className="p-2 hover:bg-orange-400 bg-orange-300"
					>
						<Plus strokeWidth={1.25} />
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader className="relative">
						<span
							className="cursor-pointer absolute -right-2 -top-2 p-2 hover:bg-zinc-100"
							onClick={() => setOpen(false)}
						>
							<X strokeWidth={1.25} size={20} />
						</span>
						<DialogTitle>Upload CV</DialogTitle>
						<DialogDescription>(Only support type: .pdf, .jpg, .png, .docx)</DialogDescription>
					</DialogHeader>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
						<Field
							control={form.control}
							name="name"
							label="CV Name"
							error={form.getFieldState("name").error}
							placeholder="Enter your CV name"
						/>
						<div className="flex items-center justify-center w-full">
							<label
								htmlFor="dropzone-file"
								className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
							>
								<div className="flex flex-col items-center justify-center pt-5 pb-6">
									<svg
										className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 20 16"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
										/>
									</svg>
									<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
										{name}
									</p>
									<p className="text-xs text-gray-500 dark:text-gray-400"></p>
								</div>
								<input
									ref={fileRef}
									onChange={(e) => log(e)}
									id="dropzone-file"
									type="file"
									className="hidden"
								/>
							</label>
						</div>
						<p className="test-[12px] text-red-500">{err}</p>
						<Button disabled={!fileRef.current?.files} type="submit" className="w-full">
							Upload
						</Button>
					</form>
					<DialogFooter></DialogFooter>
				</DialogContent>
			</Dialog>
		</Form>
	);
}
