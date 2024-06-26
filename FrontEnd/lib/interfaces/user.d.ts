interface ILogin {
	email: string;
	password: string;
}

interface IRegister extends ILogin {
	confirmpassword: string;
	user_role: user_role_t;
}

interface IUserContact {
	id: number;
	user_id: string;
	city: string;
	district: string;
	detail_address: string;
	phone: string;
}

interface IUserInformation extends Pick<IUserContact, "id" | "user_id"> {
	avatar?: string;
	name: string;
	birth: string;
	gender: gender_t;
	company_role: company_role_t;
}

interface IUser_ServiceUsing {
	id: number;
	cv_service_id: number;
	recr_service_id: number;
	user_id: string;
	expiredTime: string;
}

interface IUser_Social extends Pick<IUserContact, "id" | "user_id"> {
	link: string;
	social_type: social_type_t;
}

interface IUser_Order extends Pick<IUserContact, "id" | "user_id"> {
	order_status: order_status_t;
	cost: string;
	createAt: string;
	updateAt: string;
	cv_service_id: number;
	recr_service_id: number;
}

interface IUser {
	id: string;
	email: string;
	password?: string;
	check: string;
	createAt: string;
	updateAt: string;
	user_role: user_role_t;
	user_status: user_status_t;
	user_type: user_type_t;
	// User_Contact?: IUserContact;
	// User_Information?: IUserInformation;
	// User_Social?: IUser_Social[];
	// User_ServiceUsing?: IUser_ServiceUsing;
}
