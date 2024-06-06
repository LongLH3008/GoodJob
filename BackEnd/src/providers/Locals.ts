import dotenv from "dotenv";
import { Application } from "express";
import path from "path";

class Locals {
	public static config() {
		dotenv.config({ path: path.join(__dirname, "../../.env") });
		const PORT = `${process.env.PORT || 8080}`;
		const APP_URL = `${process.env.URL}:${PORT}`;
		const CHECK_TAXCODE = `${process.env.CHECK_TAXCODE}`;
		const PREFIX = `${process.env.PREFIX}`;
		const CORS_ENABLED = process.env.CORS_ENABLED;
		const DATABASE_URL = `${process.env.DATABASE_URL}`;
		const FE_URL = `${process.env.FE_URL}`;
		const SECRET_KEY = `${process.env.SECRET_KEY}`;

		return {
			PORT,
			APP_URL,
			DATABASE_URL,
			PREFIX,
			FE_URL,
			SECRET_KEY,
			CORS_ENABLED,
			CHECK_TAXCODE,
		};
	}

	public static init(_express: Application) {
		_express.locals.app = this.config();
		// console.log(_express.locals.app);
		return _express;
	}
}

export default Locals;
