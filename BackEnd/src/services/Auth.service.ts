import prisma from "../../prisma";
import { StatusCode } from "../enum/HttpStatus";
import { TLogin, TRegister } from "../interfaces/User.interface";
import API_Error from "../utils/Api.error";
import bcrypt from "bcryptjs";
import jwt, { verify } from "jsonwebtoken";
import Locals from "../providers/Locals";
import { Response } from "express";
import User from "./User.service";
import { Request } from "express-serve-static-core";

class Auth {
	static async Login(dt: TLogin, res: Response, req: Request) {
		const { email, password } = dt;
		const isExist = await prisma.user.findFirst({ where: { email } });
		if (!isExist) throw new API_Error("User does not exist", StatusCode.NOT_FOUND);
		const verify = await bcrypt.compare(password, isExist.password);
		if (!verify) throw new API_Error("Wrong password", StatusCode.UNAUTHORIZED);
		const token = jwt.sign({ id: isExist.id, email: isExist.email }, Locals.config().SECRET_KEY, {
			expiresIn: "7d",
		});
		if (req.cookies[`${Locals.config().SECRET_COOKIE_TOKEN_KEY}`])
			res.clearCookie(`${Locals.config().SECRET_COOKIE_TOKEN_KEY}`);
		res.cookie(Locals.config().SECRET_COOKIE_TOKEN_KEY, token, {
			httpOnly: true,
			sameSite: "strict",
			secure: false,
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});
		await prisma.user.update({ where: { id: isExist.id }, data: { user_status: "online" } });
		return { user: email };
	}

	static async Register(dt: TRegister) {
		return await User.create(dt);
	}

	static async Logout(res: Response, req: Request) {
		const token = req.cookies[`${Locals.config().SECRET_COOKIE_TOKEN_KEY}`];
		console.log(token);
		if (!token) throw new API_Error("Login expred", StatusCode.FORBIDDEN);
		res.clearCookie(`${Locals.config().SECRET_COOKIE_TOKEN_KEY}`);
		return true;
	}
}

export default Auth;
