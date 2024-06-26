import {
	ClipboardCopy,
	KeyRound,
	LogOut,
	MessagesSquare,
	PackagePlus,
	ShoppingBag,
	SquarePen,
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Notification } from "./navbar.user.notification";

export function UserControl() {
	return (
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
			{/* <Link
				href={"/login"}
				className="ml-3 p-[10px] text-sm bg-transparent rounded-md text-primary hover:text-white hover:bg-primary hover_navbtn"
			>
				Login / Register
			</Link> */}
			<DropdownMenu>
				<DropdownMenuTrigger className="cursor-pointer bg-white rounded-full" asChild>
					<Avatar className="shadow-sm w-8 h-8">
						<AvatarImage src="./user.png" alt="@shadcn" />
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<User className="mr-2 h-4 w-4" />
							<span>Profile</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<ShoppingBag className="mr-2 h-4 w-4" />
							<span>Order</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<SquarePen className="mr-2 h-4 w-4" />
							<span>CV</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<ClipboardCopy className="mr-2 h-4 w-4" />
							<span>Applied Jobs</span>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<KeyRound className="mr-2 h-4 w-4" />
						<span>Change Password</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<LogOut className="mr-2 h-4 w-4" />
						<span>Log out</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
