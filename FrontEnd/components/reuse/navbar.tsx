import Image from "next/image";
import StickyNavbar from "./navbar.sticky";
import Link from "next/link";
import { ButtonSearch, NavSearch } from "./navbar.search";
import { UserControl } from "./navbar.user";
import { UserlControlResponsive } from "./navbar.user.responsive";
import SkeletonProvider from "./skeleton";
import { Skeleton } from "../ui/skeleton";

const Navbar = () => {
	return (
		<>
			<div className="res_layout bg-gradient-to-r z-50 relative from-orange-400 to-amber-400 text-white  w-full h-[14px] text-right text-[9px] justify-end flex items-center">
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
						<Link
							href={"/job"}
							className="hover_navlink hover:text-white rounded-md p-3 px-4 xl:px-7"
						>
							Jobs
						</Link>
						<Link
							href={"/company"}
							className="hover_navlink hover:text-white rounded-md p-3 px-4 xl:px-7"
						>
							Company
						</Link>
						<Link
							href={"/"}
							className="hover_navlink hover:text-white rounded-md p-3 px-4 xl:px-7"
						>
							About
						</Link>
						<Link
							href={"/"}
							className="hover_navlink hover:text-white rounded-md p-3 px-4 xl:px-7"
						>
							Contact
						</Link>
					</div>
					<div className="col-span-1 flex justify-end items-center gap-3 max-lg:hidden">
						<ButtonSearch />
						<SkeletonProvider
							skeleton={<Skeleton className="h-full w-[70%]" />}
							duration={1000}
						>
							<UserControl />
						</SkeletonProvider>
					</div>
					<div className="col-span-1 hidden justify-end items-center gap-3 max-lg:flex">
						<ButtonSearch />
						<UserlControlResponsive />
					</div>
				</div>
			</StickyNavbar>
			<NavSearch />
		</>
	);
};

export default Navbar;
