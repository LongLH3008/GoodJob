import axios from "axios";

export const instance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_BASE_PREFIX}`,
	/* Dùng credentials vì BE và FE khác cổng để gửi cookie đi kèm mỗi lần request đến server (CORS)
	Nếu BE và FE cùng host và cổng thì k cần dùng */
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});
