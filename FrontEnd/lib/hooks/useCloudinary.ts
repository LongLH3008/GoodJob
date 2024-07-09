import axios from "axios";
import crypto from "crypto";
import { create } from "zustand";

type Upload = {
	file: null | File;
	remove: boolean;
	demo: string;
	setUpload: (upload: Partial<Upload>) => void;
};

export const uploadState = create<Upload>((set) => ({
	file: null,
	demo: "",
	remove: false,
	setUpload: (upload: Partial<Upload>) => {
		set((state) => ({ ...state, ...upload }));
	},
}));

const generateSHA1 = (data: any) => {
	const hash = crypto.createHash("sha1");
	hash.update(data);
	return hash.digest("hex");
};

const generateSignature = (public_id: string, apiSecret: string) => {
	const timestamp = new Date().getTime();
	return `public_id=${public_id}&timestamp=${timestamp}${apiSecret}`;
};

export const handleDeleteImage = async (src: string) => {
	if (src == null) return;
	const public_id =
		`${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}` +
		src.split(`${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}`)[1].split(".")[0];

	const timestamp = new Date().getTime();
	const api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
	const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
	const signature = generateSHA1(generateSignature(public_id, apiSecret as string));

	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_REMOVE}`, {
			public_id,
			signature,
			api_key,
			timestamp,
		});
		return response;
	} catch (error) {
		console.error(error);
	}
};

export const handleUpload = async (file: File) => {
	if (!file || file == null) return;

	try {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_UPLOAD_PRESET!);
		formData.append("folder", `${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}/applicant` as string);

		const { data } = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD}`, formData);
		console.log("File uploaded successfully:", data);
		return { id: data.public_id, src: data.url };
	} catch (error) {
		console.error("Error uploading file:", error);
	}
};
