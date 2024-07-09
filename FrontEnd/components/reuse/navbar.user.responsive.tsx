"use client";
import { Button } from "@/components/ui/button";

import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
	CircleDashed,
	ClipboardCopy,
	KeyRound,
	Lock,
	LogIn,
	LogOut,
	Menu,
	MessagesSquare,
	PackagePlus,
	ShoppingBag,
	SquarePen,
	Unplug,
	User,
} from "lucide-react";
import Link from "next/link";
import { NotificationResponsive } from "./navbar.user.notification.responsive";
import { InfoState, UserState } from "@/lib/hooks/user";
import Image from "next/image";
import { instance } from "@/lib/api/api";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export function UserlControlResponsive() {
	const { isLogged, id, email, resetUser } = UserState();
	const { avatar } = InfoState();
	const router = useRouter();

	const Logout = async () => {
		try {
			await instance.get("/auth/logout");
			toast({
				title: `Logout success`,
				description: `See you again ${email.split("@")[0]}`,
				action: <LogOut strokeWidth={1.25} className="text-[#ff9c00]" />,
				duration: 5000,
			});
			resetUser();
			router.push("/");
		} catch (error: any) {
			toast({
				description: error.response
					? error.response.data
					: "Could not connect to server. Please try again later",
				duration: 3500,
				action: error.response ? (
					<Lock strokeWidth={1.25} className="text-red-500" />
				) : (
					<Unplug strokeWidth={1.25} className="text-red-500" />
				),
			});
			error.response.data && router.push("/");
		}
	};
	return (
		<>
			{isLogged && (
				<>
					<NotificationResponsive />
					<Link
						href="cv-services"
						className="p-2 relative bg-transparent rounded-md text-primary hover:text-white hover:bg-primary hover_navbtn"
					>
						<span className="absolute top-1 right-1 flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff9c00] opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff9c00]"></span>
						</span>
						<MessagesSquare strokeWidth={1.25} />
					</Link>
				</>
			)}
			<Sheet>
				<SheetTrigger asChild>
					<Button className="hover_navbtn bg-transparent text-primary p-2">
						<Menu strokeWidth={1} className="w-7 h-7" />
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						{/* Sidebar Title */}
						<SheetTitle className="text-left pb-5 border-b flex items-center gap-3">
							{isLogged ? (
								<>
									<div className="shadow-sm flex items-center justify-center overflow-hidden rounded-full w-8 h-8">
										<Image
											src={avatar !== "" ? (avatar as string) : "/user.png"}
											width={100}
											height={100}
											className="w-full h-full object-cover"
											alt="avatar"
										/>
									</div>
									<p className="font-semibold text-sm">{email}</p>
								</>
							) : (
								<>
									<p className="font-semibold text-sm">GoodJob</p>
								</>
							)}
						</SheetTitle>
						{/* -------------- */}
					</SheetHeader>

					{/* Sidebar Link  */}
					<div className="grid gap-4 py-4 border-b text-sm">
						<SheetClose asChild>
							<Link href={"/"} className="flex items-center gap-3">
								<CircleDashed strokeWidth={1.25} className="mr-2 h-5 w-5" />
								<span>Home</span>
							</Link>
						</SheetClose>
						<SheetClose asChild>
							<Link href={"/job"} className="flex items-center gap-3">
								<CircleDashed strokeWidth={1.25} className="mr-2 h-5 w-5" />
								<span>Jobs</span>
							</Link>
						</SheetClose>
						<SheetClose asChild>
							<Link href={"/company"} className="flex items-center gap-3">
								<CircleDashed strokeWidth={1.25} className="mr-2 h-5 w-5" />
								<span>Company</span>
							</Link>
						</SheetClose>
						<SheetClose asChild>
							<Link href={"/"} className="flex items-center gap-3">
								<CircleDashed strokeWidth={1.25} className="mr-2 h-5 w-5" />
								<span>Contact</span>
							</Link>
						</SheetClose>
						<SheetClose asChild>
							<Link href={"/"} className="flex items-center gap-3">
								<CircleDashed strokeWidth={1.25} className="mr-2 h-5 w-5" />
								<span>About</span>
							</Link>
						</SheetClose>
					</div>
					{/* -------------- */}

					{/* Sidebar UserControl */}
					{isLogged && (
						<>
							<div className="grid gap-4 py-4 border-b text-sm">
								<SheetClose asChild>
									<Link href={"/cv-services"} className="flex items-center gap-3">
										<PackagePlus strokeWidth={1.25} className="mr-2 h-5 w-5" />
										<span>Services</span>
									</Link>
								</SheetClose>
								<SheetClose asChild>
									<Link href={"/"} className="flex items-center gap-3">
										<ShoppingBag strokeWidth={1.25} className="mr-2 h-5 w-5" />
										<span>Order</span>
									</Link>
								</SheetClose>
								<SheetClose asChild>
									<Link href={"/"} className="flex items-center gap-3">
										<SquarePen strokeWidth={1.25} className="mr-2 h-5 w-5" />
										<span>CV</span>
									</Link>
								</SheetClose>
								<SheetClose asChild>
									<Link href={"/"} className="flex items-center gap-3">
										<ClipboardCopy
											strokeWidth={1.25}
											className="mr-2 h-5 w-5"
										/>
										<span>Applied Jobs</span>
									</Link>
								</SheetClose>
							</div>
						</>
					)}
					<div className="grid gap-4 py-4 text-sm">
						{isLogged ? (
							<>
								<SheetClose asChild>
									<Link
										href={`/applicant-profile/${id}`}
										className="flex items-center gap-3"
									>
										<User strokeWidth={1.25} className="mr-2 h-5 w-5" />
										<span>Profile</span>
									</Link>
								</SheetClose>
								<SheetClose asChild>
									<Link
										href={"/changepassword"}
										className="flex items-center gap-3"
									>
										<KeyRound strokeWidth={1.25} className="mr-2 h-5 w-5" />
										<span>Change Password</span>
									</Link>
								</SheetClose>
								<SheetClose asChild>
									<span
										onClick={() => Logout()}
										className="flex items-center gap-3"
									>
										<LogOut strokeWidth={1.25} className="mr-2 h-5 w-5" />
										<span>Logout</span>
									</span>
								</SheetClose>
							</>
						) : (
							<SheetClose asChild>
								<Link href={"/login"} className="flex items-center gap-3">
									<LogIn strokeWidth={1.25} className="mr-2 h-5 w-5" />
									<span>Login / Register</span>
								</Link>
							</SheetClose>
						)}
					</div>
					{/* -------------- */}
				</SheetContent>
			</Sheet>
		</>
	);
}
