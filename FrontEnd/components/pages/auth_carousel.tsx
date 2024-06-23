"use client";
import React, { useEffect, useState } from "react";

type Props = {};

export const carousel = [
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

const AuthCarousel = (props: Props) => {
	const [slide, setSlide] = useState(0);

	useEffect(() => {
		const autoSlide = setInterval(() => {
			setSlide((prevSlide) => (prevSlide + 1 > carousel.length - 1 ? 0 : prevSlide + 1));
		}, 5000);

		return () => {
			clearInterval(autoSlide);
		};
	}, []);

	return (
		<>
			{carousel.map((item, index) => (
				<div
					key={index}
					style={{ backgroundImage: `url(${item.src})` }}
					className={`${
						slide !== index ? "hidden" : ""
					} absolute bg-primary  p-10 flex items-center justify-start inset-0 bg-cover transition-all duration-1000`}
				>
					<h2 className="translate-y-2 a text-5xl w-1/2 text-inherit font-bold uppercase p-3 drop-shadow-2xl z-20">
						{item.title}
					</h2>
				</div>
			))}
		</>
	);
};

export default AuthCarousel;
