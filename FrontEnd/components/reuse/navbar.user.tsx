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
import { ContactState, InfoState, UserState } from "@/lib/hooks/user";
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
			} else {
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
			InfoState.getState().resetInfo();
			ContactState.getState().resetContact();
			router.push("/");
		} catch (error: any) {
			if (!error.response.data) {
				toast({
					description: "Could not connect to server. Please try again later",
					duration: 3500,
					action: <Unplug strokeWidth={1.25} className="text-red-500" />,
				});
			}
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
						<PackagePlus strokeWidth={1} />
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
						<MessagesSquare strokeWidth={1} />
					</Link>
					<DropdownMenu>
						<DropdownMenuTrigger className="cursor-pointer z-30" asChild>
							<div className="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center">
								<Image
									width={100}
									height={100}
									src={
										info.avatar && info.avatar !== null
											? info.avatar
											: "/user.png"
									}
									alt="Description of my image"
									className="w-full h-full object-cover"
								/>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-56">
							<DropdownMenuLabel className="text-[13px]">My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem className="py-0">
									<Link
										className="flex items-center w-full h-full py-2 text-sm"
										href={`/applicant-profile/${isLogged}`}
									>
										<User className="mr-2 h-4 w-4" strokeWidth={1.25} />
										<span className="text-[13px]">Profile</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem className="py-0">
									<Link
										href={"/"}
										className="flex items-center w-full h-full py-2 text-sm"
									>
										<ShoppingBag className="mr-2 h-4 w-4" strokeWidth={1.25} />
										<span className="text-[13px]">Order</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem className="py-0">
									<Link
										href={`/cv`}
										className="flex items-center w-full h-full py-2 text-sm"
									>
										<SquarePen className="mr-2 h-4 w-4" strokeWidth={1.25} />
										<span className="text-[13px]">CV</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem className="py-0">
									<Link
										href={"/"}
										className="flex items-center w-full h-full py-2 text-sm"
									>
										<ClipboardCopy
											className="mr-2 h-4 w-4"
											strokeWidth={1.25}
										/>
										<span className="text-[13px]">Applied Jobs</span>
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="py-0">
								<Link
									href={"/"}
									className="flex items-center w-full h-full py-2 text-sm"
								>
									<KeyRound className="mr-2 h-4 w-4" strokeWidth={1.25} />
									<span className="text-[13px]">Change Password</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => Logout()}>
								<LogOut className="mr-2 h-4 w-4" strokeWidth={1.25} />
								<span className="text-[13px]">Log out</span>
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
