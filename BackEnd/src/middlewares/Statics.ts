import express, { Application } from "express";
import path from "path";
import cookieParser from "cookie-parser";
class Statics {
	public static mount(_express: Application): Application {
		_express.use(express.json());
		_express.use(cookieParser());
		_express.use(express.urlencoded({ extended: false }));
		_express.use(express.static(path.join(__dirname, "public")));

		return _express;
	}
}

export default Statics;
