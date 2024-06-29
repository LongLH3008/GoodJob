import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { JWSSignatureVerificationFailed } from "jose/errors";
import { Logout } from "./lib/api/auth";

const routes = {
	employerPaths: ["/employer", "/recr-services"],
	authPaths: ["/login", "/register", "/forgotpassword"],
	guesPaths: ["/company", "/contact", "/about"],
	applicantPaths: ["/applicant", "/cv-services"],
	adminPaths: ["/dashboard"],
};

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const sessionToken = request.cookies.get("sessionToken")?.value;
	let role: any = "";

	if (sessionToken) {
		try {
			const key = new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN_SECRET_KEY);
			const decode = await jwtVerify(sessionToken, key, { algorithms: ["HS256"] });
			role = decode ? decode.payload.role : "";
		} catch (error: any) {
			console.log(
				error instanceof JWSSignatureVerificationFailed
					? `Signature verification failed: ${error.message}`
					: `Failed to verify JWT: ${error.message}`
			);
		}
	}

	const protectRoute = (
		protect: user_role_t | string,
		role: user_role_t | "",
		login: "need login" | "no need login"
	) => {
		const isLogged = request.cookies.get("uid")?.value;
		if (login == "need login" && !isLogged) return Response.redirect(new URL("/login", request.url));
		if (role == protect) return;
		switch (role) {
			case "Employer":
				return Response.redirect(new URL("/employer", request.url));
			case "Applicant":
				return Response.redirect(new URL("/", request.url));
			case "Administrator":
				return Response.redirect(new URL("/dashboard", request.url));
			default:
				return Response.redirect(new URL("/", request.url));
		}
	};

	if (routes.authPaths.some((path) => pathname.startsWith(path))) {
		return protectRoute("", role, "no need login");
	}

	if (routes.adminPaths.some((path) => pathname.startsWith(path))) {
		return protectRoute("Administrator", role, "need login");
	}

	if (routes.employerPaths.some((path) => pathname.startsWith(path))) {
		return protectRoute("Employer", role, "need login");
	}

	if (routes.applicantPaths.some((path) => pathname.startsWith(path))) {
		return protectRoute("Applicant", role, "need login");
	}

	if (pathname == "/" || routes.guesPaths.some((path) => pathname.startsWith(path))) {
		if (role == "Administrator") return Response.redirect(new URL("/dashboard", request.url));
		if (role == "Employer") return Response.redirect(new URL("/employer", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/:path*"],
};
