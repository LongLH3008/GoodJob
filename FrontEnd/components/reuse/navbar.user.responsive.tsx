import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Bell,
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

export function UserlControlResponsive() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="hover_navbtn bg-transparent text-primary p-2">
					<Menu strokeWidth={1} className="w-7 h-7" />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className="text-left pb-5 border-b flex items-center gap-3">
						<Avatar className="shadow-sm w-8 h-8">
							<AvatarImage src="./user.png" alt="@shadcn" />
						</Avatar>
						<p className="font-semibold text-sm">My account</p>
					</SheetTitle>
				</SheetHeader>
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
							<ClipboardCopy strokeWidth={1.25} className="mr-2 h-5 w-5" />
							<span>Applied Jobs</span>
						</Link>
					</SheetClose>
				</div>
				<div className="grid gap-4 py-4 text-sm">
					<SheetClose asChild>
						<Link href={"/"} className="flex items-center gap-3">
							<User strokeWidth={1.25} className="mr-2 h-5 w-5" />
							<span>Profile</span>
						</Link>
					</SheetClose>
					<SheetClose asChild>
						<Link href={"/changepassword"} className="flex items-center gap-3">
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
					<SheetClose asChild>
						<Link href={"/login"} className="flex items-center gap-3">
							<LogIn strokeWidth={1.25} className="mr-2 h-5 w-5" />
							<span>Login / Register</span>
						</Link>
					</SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	);
}
