import prisma from "../../prisma";
import { StatusCode } from "../enum/HttpStatus";
import { TLogin, TRegister } from "../interfaces/User.interface";
import API_Error from "../utils/Api.error";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
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
		const key = new TextEncoder().encode(Locals.config().SECRET_KEY) as unknown as Secret;
		const token = jwt.sign({ id: isExist.id, email: isExist.email, role: isExist.user_role }, key, {
			expiresIn: "7d",
		});
		if (req.cookies[`${Locals.config().SECRET_COOKIE_TOKEN_KEY}`] || req.cookies[`uid`]) {
			res.clearCookie(`${Locals.config().SECRET_COOKIE_TOKEN_KEY}`);
			res.clearCookie("uid");
		}
		res.cookie(Locals.config().SECRET_COOKIE_TOKEN_KEY, token, {
			httpOnly: true,
			sameSite: "strict",
			secure: false,
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});
		res.cookie("uid", isExist.id, {
			httpOnly: false,
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
		if (req.cookies[`${Locals.config().SECRET_COOKIE_TOKEN_KEY}`])
			res.clearCookie(`${Locals.config().SECRET_COOKIE_TOKEN_KEY}`);
		const id = req.cookies["uid"];
		if (!id) throw new API_Error("Login expred", StatusCode.FORBIDDEN);
		res.clearCookie(`uid`);
		await prisma.user.update({ where: { id }, data: { user_status: "offline" } });
		return true;
	}
}

export default Auth;
