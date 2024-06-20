import { Application } from "express";
import Http from "./Http";
import Locals from "../providers/Locals";
import Cors from "./Cors";
import Statics from "./Statics";
import Security from "./Security";

class Middleware {
	public static init(_express: Application) {
		_express = Http.mount(_express);

		if (Locals.config().CORS_ENABLED) _express = Cors.mount(_express);

		_express = Statics.mount(_express);

		_express = Security.mount(_express);

		return _express;
	}
}

export default Middleware;
