import { StatusCode } from "../enum/HttpStatus";

class API_Error extends Error {
	public readonly status: StatusCode;
	constructor(message: any, status: StatusCode) {
		super(message);
		this.message = message;
		this.status = status;
	}
}

export default API_Error;
