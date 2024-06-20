"use client";

import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
	const carousel = [
		{
			src: "'./auth_carousel (1).jpg'",
			title: "Find potential applicants\n for your company",
		},
		{
			src: "'./auth_carousel (2).jpg'",
			title: "Apply for your\n dream job",
		},
		{
			src: "'./auth_carousel (3).jpg'",
			title: "Connecting applicants\n with employers",
		},
	];

	const [slide, setSlide] = useState(0);
	console.log(slide);

	useEffect(() => {
		const autoSlide = setInterval(() => {
			setSlide((prevSlide) => (prevSlide >= carousel.length - 1 ? 0 : prevSlide + 1));
		}, 5000);

		return () => {
			clearInterval(autoSlide);
		};
	}, []);

	return (
		<div className="container relative h-dvh sm:h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
			<div className="relative hidden h-full flex-col justify-between bg-muted p-10 text-white lg:flex dark:border-r">
				<div
					style={{ backgroundImage: `url(${carousel[slide].src})` }}
					className="absolute p-10 flex items-center justify-start inset-0 bg-cover transition-all duration-1000"
				>
					<h2 className="title text-5xl  transition-all duration-1000 w-1/2 text-inherit font-bold uppercase p-3 drop-shadow-2xl shadow-input z-20">
						{carousel[slide].title}
					</h2>
				</div>
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
