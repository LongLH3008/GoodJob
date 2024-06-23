import {
	CircleUser,
	ClipboardCheck,
	ClipboardCopy,
	KeyRound,
	LogOut,
	ShoppingBag,
	SquarePen,
	StickyNote,
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

export function UserControl() {
	return (
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
	);
}
