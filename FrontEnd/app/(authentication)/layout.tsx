import AuthCarousel from "@/components/pages/auth_carousel";
import Image from "next/image";
import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="container relative h-dvh sm:h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="relative border-r shadow-xl hidden h-full flex-col justify-between bg-muted p-10 text-white lg:flex dark:border-r">
				<AuthCarousel />
				<div className="relative bottom-0 z-20 flex items-center text-lg font-medium rounded-md p-3 bg-[rgba(0,0,0,0.65)] w-fit">
					<Image src={"/logo_secondary.svg"} width={200} height={100} alt="logo" quality={100} />
				</div>
				<div className="relative bottom-0 left-0 z-20 flex flex-col items-center justify-between my-3 bg-[rgba(0,0,0,0.65)] rounded-md p-3">
					<blockquote className="space-y-2">
						<p className="text-sm">
							“GoodJob Recruitment helps thousands of employers and applicants connect with
							each other. Assisting employers to find the right candidates and helping
							candidates find their dream jobs”
						</p>
						<footer className="text-sm flex gap-3 items-center text-[11px]">
							<Image src={"/logo_mini.svg"} width={20} height={20} alt="logo" />
							This belongs to
							<a
								className="hover:underline text-[#ff9c00]"
								target="_blank"
								href={"https://github.com/LongLH3008"}
							>
								LongLH
							</a>{" "}
							&copy; 2024
						</footer>
					</blockquote>
				</div>
			</div>
			{children}
		</div>
	);
};

export default AuthLayout;
