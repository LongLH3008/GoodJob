import { Application } from "express";
import cors from "cors";
import Locals from "../providers/Locals";

class Cors {
	public static mount(_express: Application) {
		_express.use(
			cors({
				// origin cho phép các host nào sẽ được phép tương tác với server (CORS)
				origin: Locals.config().FE_URL,
				/* Dùng credentials vì BE và FE khác cổng để gửi cookie đi kèm mỗi lần request đến server (CORS)
				Nếu BE và FE cùng host và cổng thì k cần dùng */
				credentials: true,
			})
		);
		return _express;
	}
}

export default Cors;
