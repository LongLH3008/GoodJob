import Image from "next/image";
import StickyNavbar from "../ui/sticky-navbar";
import Link from "next/link";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

type Props = {};

const Navbar = (props: Props) => {
	return (
		<>
			<StickyNavbar className="px-48">
				<div className="w-full h-full leading-[100%] flex justify-between items-center">
					<Link href={"/"} className="w-[10%] cursor-pointer">
						<Image
							src={"/logo.svg"}
							width={200}
							height={100}
							className="w-full"
							alt="goodjob"
						/>
					</Link>
					<div className="flex justify-between items-center gap-2">
						<Link
							href={"/job"}
							className="hover:bg-primary hover:text-white rounded-md p-3 px-10"
						>
							Jobs
						</Link>
						<Link
							href={"/company"}
							className="hover:bg-primary hover:text-white rounded-md p-3 px-10"
						>
							Company
						</Link>
						<Link href={"/"} className="hover:bg-primary hover:text-white rounded-md p-3 px-10">
							About
						</Link>
						<Link href={"/"} className="hover:bg-primary hover:text-white rounded-md p-3 px-10">
							Contact
						</Link>
					</div>
					<div className="flex justify-between items-center gap-5">
						<Button className="p-2 bg-white rounded-md text-primary border-zinc-400 border hover:text-white hover:bg-primary hover:border-primary">
							<Search />
						</Button>
						<Link
							href={"/login"}
							className="p-2 text-sm h-full py-3 bg-white rounded-md text-primary border-zinc-400 border hover:text-white hover:bg-primary hover:border-primary"
						>
							Login / Register
						</Link>
					</div>
				</div>
			</StickyNavbar>
		</>
	);
};

export default Navbar;
