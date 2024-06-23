import HomeBanner from "@/components/pages/home_banner";
import React from "react";

type Props = {};

const HomePage = (props: Props) => {
	return (
		<>
			<HomeBanner />
			<div className="res_layout">HomePage</div>
		</>
	);
};

export default HomePage;
