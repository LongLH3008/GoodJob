import Image from "next/image";
import StickyNavbar from "./navbar.sticky";
import Link from "next/link";
import { ButtonSearch, NavSearch } from "./navbar.search";
import { UserControl } from "./navbar.user";
import { UserlControlResponsive } from "./navbar.user.responsive";
import { NotificationResponsive } from "./navbar.user.notification.responsive";
import { MessagesSquare } from "lucide-react";

const Navbar = () => {
	return (
		<>
			<div className="res_layout bg-gradient-to-br z-50 relative from-orange-400 text-white to-amber-400 w-full h-5 text-right text-[12px] justify-end flex items-center">
				GoodJob - Copy right 2024 &copy; LongLH
			</div>
			<StickyNavbar className="">
				<div className="res_layout w-full h-full relative leading-[100%] flex justify-between items-center lg:grid lg:grid-cols-5">
					<Link href={"/"} className="w-3/5 col-span-1 cursor-pointer flex items-center">
						<Image
							src={"/logo.svg"}
							width={100}
							height={100}
							className="w-[45%] sm:w-[35%] lg:w-full"
							alt="goodjob"
						/>
					</Link>
					<div className="max-lg:hidden col-span-3 flex justify-center items-center gap-2">
						<Link href={"/job"} className="hover_navlink hover:text-white rounded-md p-3 px-10">
							Jobs
						</Link>
						<Link
							href={"/company"}
							className="hover_navlink hover:text-white rounded-md p-3 px-10"
						>
							Company
						</Link>
						<Link href={"/"} className="hover_navlink hover:text-white rounded-md p-3 px-10">
							About
						</Link>
						<Link href={"/"} className="hover_navlink hover:text-white rounded-md p-3 px-10">
							Contact
						</Link>
					</div>
					<div className="col-span-1 flex justify-between items-center gap-3 max-lg:hidden">
						<ButtonSearch />
						<UserControl />
					</div>
					<div className="col-span-1 hidden justify-between items-center gap-3 max-lg:flex">
						<ButtonSearch />
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
						<UserlControlResponsive />
					</div>
				</div>
			</StickyNavbar>
			<NavSearch />
		</>
	);
};

export default Navbar;
