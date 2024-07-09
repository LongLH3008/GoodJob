import { mutate } from "swr";
import { instance } from "../api/api";
import { Logout } from "../api/auth";

export const SwrFetcher = async (url: string) => {
	try {
		const { data } = await instance.get(url);
		return data;
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
};

export const SwrExecute = async (
	url: string,
	{
		arg,
	}: {
		arg: { method?: RequestMethod; formdata?: any };
	}
) => {
	try {
		let data;
		const optimisticData = arg.formdata || null;

		switch (arg.method) {
			case "POST":
				mutate(url, optimisticData, false);
				data = await instance.post(url, arg.formdata);
				break;
			case "PUT":
				mutate(url, optimisticData, false);
				data = await instance.put(url, arg.formdata);
				break;
			case "DELETE":
				mutate(url, optimisticData, false);
				data = await instance.delete(url);
				break;
			default:
				throw new Error("Unsupported method");
		}

		mutate(url, data.data, false);
		return data.data;
	} catch (error: any) {
		if (error.response.data == "Please login first" || error.response.data == "Login expired") {
			await Logout();
		}
		console.error("Execute error:", error);
		throw error;
	}
};
