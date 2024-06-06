import { StatusCode } from "../enum/HttpStatus";
import API_Error from "../utils/Api.error";

export const SchemaValidate = (schema: any, objectValidate: any) => {
	const { error } = schema.validate(objectValidate, { abortEarly: false });

	if (error) {
		const errors = error.details.map((item: any) => item.message);
		throw new API_Error(errors, StatusCode.CONFLICT);
	}

	return true;
};
