type TService = {
	id?: number;
	name: string;
	price: number;
	discount: number;
	describe: string;
	recommended: string;
};

export interface ICV_Service extends TService {
	cv_service_expired: cv_service_expired_t;
	totalCv: number;
}

export interface IRecr_Service extends TService {
	recr_service_expired: cv_service_expired_t;
	totalRecr: number;
}
