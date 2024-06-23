import Image from "next/image";
import StickyNavbar from "./navbar_sticky";
import Link from "next/link";
import { MessagesSquare, PackagePlus, Search } from "lucide-react";
import { UserControl } from "./navbar_usercontrol";
import { Notification } from "./navbar_notification";
import { ButtonSearch, NavSearch } from "./navbar_search";

const Navbar = () => {
	return (
		<>
			<div className="bg-gradient-to-br z-50 relative from-orange-400 text-white to-amber-400 w-full h-5 text-right px-48 text-[12px] justify-end flex items-center">
				GoodJob - Copy right 2024 &copy; LongLH
			</div>
			<StickyNavbar className="">
				<div className="px-48 w-full h-full relative leading-[100%] grid grid-cols-5">
					<Link href={"/"} className="w-3/5 col-span-1 cursor-pointer flex items-center">
						<Image
							src={"/logo.svg"}
							width={100}
							height={100}
							className="w-full"
							alt="goodjob"
						/>
					</Link>
					<div className="col-span-3 flex justify-center items-center gap-2">
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
					<div className="col-span-1 flex justify-between items-center gap-3">
						<ButtonSearch />
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
						<UserControl />
					</div>
				</div>
			</StickyNavbar>
			<NavSearch />
		</>
	);
};

export default Navbar;
