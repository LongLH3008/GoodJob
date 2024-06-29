"use client";
import { Button } from "@/components/ui/button";

import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
	CircleDashed,
	ClipboardCopy,
	KeyRound,
	LogIn,
	LogOut,
	Menu,
	MessagesSquare,
	PackagePlus,
	ShoppingBag,
	SquarePen,
	User,
} from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { NotificationResponsive } from "./navbar.user.notification.responsive";
import { UserState } from "@/lib/hooks/user";

export function UserlControlResponsive() {
	const user = UserState();
	return (
		<>
			{user.isLogged && (
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
							{user.isLogged ? (
								<>
									<Avatar className="shadow-sm w-8 h-8">
										<AvatarImage
											src={user.avatar !== "" ? user.avatar : "./user.png"}
											alt="@shadcn"
										/>
									</Avatar>
									<p className="font-semibold text-sm">{user.email}</p>
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
					{user.isLogged && (
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
						{user.isLogged ? (
							<>
								<SheetClose asChild>
									<Link href={"/"} className="flex items-center gap-3">
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
									<Link href={"/logout"} className="flex items-center gap-3">
										<LogOut strokeWidth={1.25} className="mr-2 h-5 w-5" />
										<span>Logout</span>
									</Link>
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
