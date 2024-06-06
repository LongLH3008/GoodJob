import { Application } from "express";
import cors from "cors";
import Locals from "../providers/Locals";

class Cors {
	public static mount(_express: Application) {
		_express.use(cors({ origin: Locals.config().FE_URL || Locals.config().APP_URL }));
		return _express;
	}
}

export default Cors;
