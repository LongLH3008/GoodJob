import { ReasonStatusCode, StatusCode } from "../enum/HttpStatus";

class API_Response {
	public readonly message: string;
	public readonly status: StatusCode;
	public readonly metadata: object | null;

	constructor({
		message = ReasonStatusCode.OK,
		status = StatusCode.OK,
		metadata = {},
	}: {
		message?: string;
		status?: StatusCode;
		metadata?: {};
	}) {
		this.message = message;
		this.status = status;
		this.metadata = metadata;
	}

	public send(res: any, error?: { code: number | string; message: string }, headers = {}): void {
		const statusCode = error ? error.code : this.status;
		const message = error ? error.message : this;
		res.status(statusCode).json(message);
	}
}

export default API_Response;
