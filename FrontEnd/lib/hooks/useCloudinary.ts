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

const uploadImg = async (formData: any) => {
	try {
		const { data } = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return { id: data.public_id, src: data.url };
	} catch (error) {
		console.error("Error uploading file:", error);
	}
};

const deleteImg = async (verify: any) => {
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_REMOVE}`, { ...verify });
		// return response;
		return true;
	} catch (error) {
		console.error(error);
	}
};

const uploadFile = async (formData: any) => {
	try {
		const { data } = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_RAW}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return { id: data.public_id, src: data.url };
	} catch (error) {
		console.error("Error uploading file:", error);
	}
};

const deleteFile = async (verify: any) => {
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_REMOVE_RAW}`, { ...verify });
		// return response;
		return true;
	} catch (error) {
		console.error(error);
	}
};

const deleteDoc = async (verify: any) => {
	try {
		const response = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_REMOVE_DOC}`, { ...verify });
		// return response;
		return true;
	} catch (error) {
		console.error(error);
	}
};

export const handleDeleteFile = async (src: string) => {
	if (src == null) return;
	const public_id =
		`${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}` +
		src.split(`${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}`)[1].split(".")[0];

	const img = ["png", "jpg", "jpeg", "gif", "svg"];
	const raw = ["pdf", "docx"];

	const verify = {
		public_id,
		timestamp: new Date().getTime(),
		api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
		apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
		signature: generateSHA1(
			generateSignature(public_id, process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string)
		),
	};

	if (img.find((item) => src.includes(item))) {
		await deleteImg(verify);
	} else {
		await deleteFile(verify);
	}
};

export const handleUpload = async (file: File) => {
	if (!file || file == null) return;
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_UPLOAD_PRESET!);
	formData.append("folder", `${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}/applicant` as string);

	const img = ["jpg", "jpeg", "svg", "gif", "png"];
	const checkFile = img.find((item) => file.name.includes(item));

	return checkFile == undefined ? await uploadFile(formData) : await uploadImg(formData);
};
