import HomeApplicant from "@/app/(guess)/(home)/home.applicants";
import HomeBanner from "@/app/(guess)/(home)/home.banner";
import HomeProfessionCategory from "@/app/(guess)/(home)/home.professionlist";
import React from "react";

type Props = {};

const HomePage = (props: Props) => {
	return (
		<>
			<HomeBanner />
			<HomeProfessionCategory />
			<HomeApplicant />
			<div className="res_layout">HomePage</div>
		</>
	);
};

export default HomePage;
