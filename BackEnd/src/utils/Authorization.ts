import { user_role_t } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import Locals from "../providers/Locals";
import prisma from "../../prisma";

export const checkAuth = (fn: Function, allow_role: user_role_t[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const token = req.cookies[`${Locals.config().SECRET_COOKIE_TOKEN_KEY}`];
		if (!token) return res.status(401).json({ message: "Please login first" });
		verify(token, Locals.config().SECRET_KEY, async (err: any, payload: any) => {
			if (err) return res.status(401).json({ message: "Login expired" });
			const user = await prisma.user.findFirst({
				where: { id: payload.id, user_role: { in: allow_role } },
			});
			if (!user) return res.status(403).json({ message: "You don't have permision" });
			fn(req, res, next).catch(next);
		});
	};
};
