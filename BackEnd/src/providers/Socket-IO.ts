import { Server } from "socket.io";
import Locals from "./Locals";
import prisma from "../../prisma";
import jwt from "jsonwebtoken";

class SocketIO {
	public static init(server: any) {
		const io = new Server(server, {
			cors: {
				origin: Locals.config().FE_URL,
				credentials: true,
			},
		});

		io.use((socket, next) => {
			const cookies = socket.handshake.headers.cookie;
			if (!cookies) {
				return next(new Error("Authentication error"));
			}
			const token = cookies
				.split(";")
				.find((c) => c.trim().startsWith(`${Locals.config().SECRET_COOKIE_TOKEN_KEY}=`));

			console.log(token);

			if (token) {
				const jwtToken = token.split("=")[1];
				jwt.verify(jwtToken, Locals.config().SECRET_KEY, (err: any, decoded: any) => {
					if (err) {
						console.log(err);
						return next(new Error("Authentication error"));
					}
					socket.data.user = decoded;
					console.log(socket.data.user);
					next();
				});
			} else {
				console.log("error");
				return next(new Error("Authentication error"));
			}
		});

		io.on("connection", (socket) => {
			console.log(`User connected: ${socket.id}`);

			socket.on("getReview", async (id) => {
				const reviews = await prisma.reviews.findMany({
					where: { company_id: id },
					select: {
						content: true,
						createAt: true,
						vote: true,
						User: {
							select: {
								email: true,
								User_Information: {
									select: {
										avatar: true,
									},
								},
							},
						},
					},
				});
				socket.emit("receiveReview", reviews.length > 0 ? reviews : []);
			});
		});
	}
}

export default SocketIO;
