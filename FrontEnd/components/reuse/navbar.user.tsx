"use client";
import {
	ClipboardCopy,
	KeyRound,
	Lock,
	LogOut,
	MessagesSquare,
	PackagePlus,
	ShoppingBag,
	SquarePen,
	Unplug,
	User,
} from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Notification } from "./navbar.user.notification";
import { InfoState, UserState } from "@/lib/hooks/user";
import { instance } from "@/lib/api/api";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { getUser } from "@/lib/api/auth";
import Image from "next/image";

export function UserControl() {
	const user = UserState();
	const info = InfoState();
	const router = useRouter();
	const isLogged = Cookies.get("uid");

	useEffect(() => {
		(async () => {
			if (isLogged && isLogged !== "") {
				getUser(isLogged);
			}
			if (!isLogged && user.isLogged) {
				await Logout();
			}
		})();
	}, []);

	const Logout = async () => {
		try {
			await instance.get("/auth/logout");
			toast({
				title: `Logout success`,
				description: `See you again ${user.email.split("@")[0]}`,
				action: <LogOut strokeWidth={1.25} className="text-[#ff9c00]" />,
				duration: 5000,
			});
			user.resetUser();
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
			{user.isLogged ? (
				<>
					<Link
						href="cv-services"
						className="p-2 bg-transparent rounded-md text-primary hover:text-white hover_navbtn hover:border-primary"
					>
						<PackagePlus strokeWidth={1.25} />
					</Link>
					<Notification />
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
					<DropdownMenu>
						<DropdownMenuTrigger className="cursor-pointer z-30" asChild>
							<div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
								<Image
									width={200}
									height={100}
									src={
										info.avatar && info.avatar !== null
											? info.avatar
											: "/user.png"
									}
									alt="Description of my image"
									className="h-full w-full object-cover"
								/>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem className="py-0">
									<Link
										className="flex items-center w-full h-full py-2"
										href={`/applicant-profile/${isLogged}`}
									>
										<User className="mr-2 h-4 w-4" />
										<span>Profile</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem className="py-0">
									<Link href={"/"} className="flex items-center w-full h-full py-2">
										<ShoppingBag className="mr-2 h-4 w-4" />
										<span>Order</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem className="py-0">
									<Link href={"/"} className="flex items-center w-full h-full py-2">
										<SquarePen className="mr-2 h-4 w-4" />
										<span>CV</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem className="py-0">
									<Link href={"/"} className="flex items-center w-full h-full py-2">
										<ClipboardCopy className="mr-2 h-4 w-4" />
										<span>Applied Jobs</span>
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="py-0">
								<Link href={"/"} className="flex items-center w-full h-full py-2">
									<KeyRound className="mr-2 h-4 w-4" />
									<span>Change Password</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => Logout()}>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</>
			) : (
				<Link
					href={"/login"}
					className="ml-3 p-[10px] bg-primary text-white text-sm rounded-md text-primary hover:text-white hover:bg-primary hover_navbtn"
				>
					Login / Register
				</Link>
			)}
		</>
	);
}
