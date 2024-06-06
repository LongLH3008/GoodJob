import { Application } from "express";
import Log from "./Logs";
import morgan from "morgan";
import api from "../routers/api";
import Locals from "./Locals";

class Routes {
	public static mountApi(_express: Application): Application {
		Log.showLogs("Mounting API routes");
		_express.use(morgan("short"));
		return _express.use(`/${Locals.config().PREFIX}`, api);
	}
}

export default Routes;
