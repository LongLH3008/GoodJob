import { instance } from "../api/api";

export const SwrFetcher = async (url: string) => {
	try {
		const { data } = await instance.get(url);
		return data;
	} catch (error) {
		throw error;
	}
};

export const SwrExecute = async (
	url: string,
	{
		arg,
	}: {
		arg: { method?: "POST" | "PUT" | "DELETE"; formdata?: any };
	}
) => {
	try {
		if (arg.method === "POST") {
			const { data } = await instance.post(url, arg.formdata);
			return data;
		} else if (arg.method === "PUT") {
			const { data } = await instance.put(url, arg.formdata);
			return data;
		} else if (arg.method === "DELETE") {
			const { data } = await instance.delete(url);
			return data;
		}
	} catch (error) {
		throw error;
	}
};
