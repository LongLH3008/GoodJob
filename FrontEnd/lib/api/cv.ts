import { SendRequest, SwrExecute, SwrFetcher } from "../hooks/swr";
const delay = () => new Promise((res: any) => setTimeout(() => res(), 500));

export const getCv = async (user_id: string, getUpload?: boolean) => {
	let url = `${getUpload ? "cv_import" : "cv"}/${user_id}`;
	const { data } = await SwrFetcher(url);
	return data;
};

export const createCv = async (formdata: any, upload?: boolean) => {
	await delay();
	const { data } = await SendRequest("POST", "/cv", formdata);
	return data.metadata;
};

export const uploadCv = async (formdata: any) => {
	await delay();
	const { data } = await SendRequest("POST", "/cv_import", formdata);
	return data.metadata;
};

export const updateCv = async (id: string, formdata: any) => {
	const { data } = await SendRequest("PUT", `/cv/${id}`, formdata);
	return data.metadata;
};

export const deleteCv = async (id: any, applicant_id: string, isUpload?: boolean) => {
	let url = `/${isUpload ? "cv_import" : "cv"}/${applicant_id}/${id}`;
	const { data } = await SendRequest("DELETE", url);
	return data.metadata;
};

export const applyCv = async (cv_id: string, recr_id: string, options: "create" | "import") => {
	let url = `recr_info/${cv_id}/${recr_id}/${options}`;
	const { data } = await SendRequest("POST", url);
	return data.metadata;
};
