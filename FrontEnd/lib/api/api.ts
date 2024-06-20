import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const instance = axios.create({
	baseURL: `http://localhost:5000/api/v1`,
	/* Dùng credentials vì BE và FE khác cổng để gửi cookie đi kèm mỗi lần request đến server (CORS)
	Nếu BE và FE cùng host và cổng thì k cần dùng */
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});
