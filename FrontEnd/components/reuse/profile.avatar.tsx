"use client";

import { uploadState } from "@/lib/hooks/useCloudinary";
import React, { ChangeEvent, useRef } from "react";
import { ImageOff, ImageUp } from "lucide-react";
import { toast } from "../ui/use-toast";

const ProfileAvatar = ({ avatarSrc }: { avatarSrc: string }) => {
	const fileRef = useRef<HTMLInputElement>(null);

	const { demo, remove, setUpload } = uploadState();

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const allowType = [
				"jpg",
				"png",
				"svg+xml",
				"gif",
				"jpeg",
				"pdf",
				"vnd.openxmlformats-officedocument.wordprocessingml.document",
			];
			const selectedFile = event.target.files[0];
			// console.log(selectedFile?.type?.split("/")[1]);

			if (!allowType.includes(selectedFile?.type?.split("/")[1])) {
				toast({
					description: "File invalid (.png, .svg, .xml, .jpeg, .gif, .jpeg)",
					action: <ImageOff strokeWidth={1.25} color="#ff9c00" />,
					duration: 3000,
				});
				return;
			}

			const reader = new FileReader();
			reader.onload = (e) => setUpload({ demo: e.target?.result as string });
			reader.readAsDataURL(selectedFile);
			setUpload({ file: selectedFile, remove: false });
		}
	};

	return (
		<div className="flex justify-start items-center gap-5">
			<div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] overflow-hidden rounded-full flex items-center justify-center shadow-md border-2">
				{remove == false && avatarSrc !== "" && avatarSrc !== undefined ? (
					<img
						src={demo !== "" ? demo : avatarSrc}
						className="w-full h-full object-cover"
						alt="avatar"
					/>
				) : (
					<img
						src={demo !== "" ? demo : "/user.png"}
						className="w-full h-full object-cover"
						alt="avatar"
					/>
				)}
			</div>
			<div className="flex flex-col gap-2">
				<span
					onClick={() => fileRef.current?.click()}
					className="md:w-12 md:h-12 w-8 h-8 bg-[rgba(0,0,0,0.75)] grid place-items-center rounded-md cursor-pointer hover_navbtn text-white"
				>
					<ImageUp strokeWidth={1.25} />
				</span>
				<span
					onClick={() => {
						setUpload({ file: null, demo: "", remove: true });
					}}
					className="md:w-12 md:h-12 w-8 h-8 bg-[rgba(0,0,0,0.75)] grid place-items-center rounded-md cursor-pointer hover_navbtn text-white"
				>
					<ImageOff strokeWidth={1.25} />
				</span>
			</div>
			<input ref={fileRef} className="hidden" type="file" onChange={handleFileChange} />
		</div>
	);
};

export default ProfileAvatar;
