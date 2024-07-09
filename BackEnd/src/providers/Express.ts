import express, { Application, NextFunction, Request, Response } from "express";
import Locals from "./Locals";
import Middleware from "../middlewares";
import Routes from "./Routes";
import API_Response from "../utils/Api.response";
import { createServer } from "http";
import SocketIO from "./Socket-IO";

class Express {
	public express: Application;

	constructor() {
		this.express = express();
		this.mount();
	}

	private mount(): void {
		this.express = Locals.init(this.express);
		this.express = Middleware.init(this.express);
		this.express = Routes.mountApi(this.express);

		this.express.use((error: any, req: Request, res: Response, next: NextFunction) => {
			const statusCode = error.status || 500;
			const message = error.message || "Internal Server Error";
			const apiResponse = new API_Response({ status: statusCode, message });
			apiResponse.send(res, { code: statusCode, message });
		});
	}

	public init() {
		const port = Locals.config().PORT;
		const host = Locals.config().APP_URL;

		const server = createServer(this.express);
		SocketIO.init(server);

		// Run on port
		server.listen(port, () => console.log(`Server is running on port ${port} and host: ${host}`)).on(
			"error",
			(_error) => console.log("Error " + _error.message)
		);
	}
}

export default new (Express as any)();
