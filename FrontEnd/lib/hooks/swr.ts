import { MutatorCallback, mutate } from "swr";
import { instance } from "../api/api";
import { Logout } from "../api/auth";

export const SendRequest = async (method: "POST" | "PUT" | "GET" | "DELETE", endpoint: string, formdata?: any) => {
	try {
		let data;
		switch (method) {
			case "POST":
				data = await instance.post(endpoint, formdata);
				break;
			case "PUT":
				data = await instance.put(endpoint, formdata);
				break;
			case "DELETE":
				data = await instance.delete(endpoint);
				break;
			case "GET":
				data = await instance.get(endpoint);
			default:
				throw new Error("Unsupported method");
		}
		return data;
	} catch (error: any) {
		if (error.response && error.response.data) {
			if (error.response.data == "Please login first" || error.response.data == "Login expired") {
				await Logout();
			}
		}
		console.error("Execute error:", error);
		throw error;
	}
};

export const SwrFetcher = async (url: string | Promise<string> | MutatorCallback<string> | undefined) => {
	try {
		const { data } = await instance.get(url as string);
		return data.metadata;
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

		switch (arg.method) {
			case "POST":
				data = await instance.post(url, arg.formdata);
				break;
			case "PUT":
				data = await instance.put(url, arg.formdata);
				break;
			case "DELETE":
				data = await instance.delete(url);
				break;
			default:
				throw new Error("Unsupported method");
		}

		return data.data;
	} catch (error: any) {
		if (error.response.data == "Please login first" || error.response.data == "Login expired") {
			await Logout();
		}
		console.error("Execute error:", error);
		throw error;
	}
};
