interface ILogin {
	email: string;
	password: string;
}

interface IRegister extends ILogin {
	confirmpassword: string;
	user_role: user_role_t;
}
