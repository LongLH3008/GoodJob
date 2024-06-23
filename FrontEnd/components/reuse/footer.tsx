import { Facebook, Instagram, Mail, Send, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StickyFooter from "./footer_sticky";

function Footer() {
	return (
		<StickyFooter>
			<div className="flex flex-col gap-5 justify-end items-center">
				<Image src={"./logo_secondary.svg"} width={200} height={100} alt="logo" />
				<div className="w-2/5 flex justify-between items-start py-3">
					<ul className="text-[11px] flex flex-col gap-2">
						<li className="font-semibold text-[13px] mb-2">About</li>
						<li>
							<Link className="hover:text-[#ff9c00]" href={"/"}>
								Introduce
							</Link>
						</li>
						<li>
							<Link className="hover:text-[#ff9c00]" href={"/"}>
								Contact
							</Link>
						</li>
						<li>
							<Link className="hover:text-[#ff9c00]" href={"/"}>
								Q&A
							</Link>
						</li>
						<li>
							<Link className="hover:text-[#ff9c00]" href={"/"}>
								Privacy
							</Link>
						</li>
						<li>
							<Link className="hover:text-[#ff9c00]" href={"/"}>
								Services
							</Link>
						</li>
					</ul>
					<ul className="text-[11px] flex flex-col gap-2">
						<li className="font-semibold text-[13px] mb-2">CV</li>
						<li>
							<Link className="hover:text-[#ff9c00]" href={"/"}>
								Write CV
							</Link>
						</li>
						<li>
							<Link className="hover:text-[#ff9c00]" href={"/"}>
								Manage CV
							</Link>
						</li>
						<li>
							<Link className="hover:text-[#ff9c00]" href={"/"}>
								CV Services
							</Link>
						</li>
						<li>
							<Link className="hover:text-[#ff9c00]" href={"/"}>
								Recommended
							</Link>
						</li>
						<li>
							<Link className="hover:text-[#ff9c00]" href={"/"}>
								Services
							</Link>
						</li>
					</ul>
					<ul className="text-[11px] flex flex-col gap-2">
						<li className="font-semibold text-[13px] mb-2">Recruitment</li>
						<li>
							<Link className="hover:text-[#ff9c00]" href={"/"}>
								Info
							</Link>
						</li>
						<li>
							<Link className="hover:text-[#ff9c00]" href={"/"}>
								Applied CV
							</Link>
						</li>
						<li>
							<Link className="hover:text-[#ff9c00]" href={"/"}>
								Manage
							</Link>
						</li>
						<li>
							<Link className="hover:text-[#ff9c00]" href={"/"}>
								Recommended
							</Link>
						</li>
						<li>
							<Link className="hover:text-[#ff9c00]" href={"/"}>
								Services
							</Link>
						</li>
					</ul>
					<ul className="text-[11px] flex flex-col gap-2">
						<li className="font-semibold text-[13px] mb-2">Connect with us</li>
						<li className="flex justify-between items-center gap-3 *:cursor-pointer">
							<Facebook className="hover:text-[#ff9c00]" />
							<Instagram className="hover:text-[#ff9c00]" />
							<Twitter className="hover:text-[#ff9c00]" />
							<Mail className="hover:text-[#ff9c00]" />
						</li>
						<li className="font-semibold text-[13px] mt-3 mb-2">Subcribe for news from us</li>
						<li className="flex justify-between items-center gap-3 *:cursor-pointer">
							<Send />
							<input
								type="email"
								className="bg-transparent border-b-[1px] border-dashed py-1 px-2 outline-none"
							/>
						</li>
					</ul>
				</div>
				<div className="text-[10px] flex gap-3 items-center mt-5">
					Made from{" "}
					<a className="flex items-center gap-2" target="_blank" href="https://nextjs.org/">
						<Image
							src={"./next_favicon.svg"}
							className="aspect-auto"
							width={15}
							height={100}
							alt="logo"
						/>
						<Image
							src={"./next.svg"}
							className="aspect-auto"
							width={40}
							height={100}
							alt="logo"
						/>
					</a>
					by{" "}
					<a
						className="hover:underline text-[#ff9c00]"
						target="_blank"
						href={"https://github.com/LongLH3008"}
					>
						LongLH
					</a>{" "}
					&copy; 2024
				</div>
			</div>
		</StickyFooter>
	);
}

export default Footer;
