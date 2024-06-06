import express, { Application } from "express";
import cors from "cors";
// import flash from "connect-flash";
import helmet from "helmet";
import compression from "compression";

class Http {
	public static mount(_express: Application): Application {
		_express.use(cors());
		// _express.use(flash());
		_express.use(helmet());
		_express.use(compression());
		return _express;
	}
}

export default Http;
