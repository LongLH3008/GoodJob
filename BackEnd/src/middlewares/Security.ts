import lusca from "lusca";
import { Application } from "express";
import Locals from "../providers/Locals";
class Security {
	public static mount(_express: Application): Application {
		_express.set("trust proxy", 1);

		_express.use((req, res, next) => {
			if (req.originalUrl.includes(`/${Locals.config().PREFIX}/`)) {
				next();
			} else {
				lusca.csrf()(req, res, next);
			}
		});

		_express.use(lusca.xframe("SAMEORIGIN"));
		_express.use(lusca.xssProtection(true));

		return _express;
	}
}

export default Security;
