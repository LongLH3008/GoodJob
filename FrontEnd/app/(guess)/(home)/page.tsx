"use client";
import HomeApplicant from "@/app/(guess)/(home)/home.applicants";
import HomeBanner from "@/app/(guess)/(home)/home.banner";
import HomeProfessionCategory from "@/app/(guess)/(home)/home.professionlist";
import HomeSubscribe from "./home.subcribe";
import HomeIntroduce from "./home.introduce";
import { HomeReview } from "./home.review";
import HomeEmployer from "./home.employer";

type Props = {};

const HomePage = (props: Props) => {
	return (
		<>
			<HomeBanner />
			<HomeIntroduce />
			<HomeApplicant />
			<HomeEmployer />
			<HomeProfessionCategory />
			<HomeReview />
			<HomeSubscribe />
		</>
	);
};

export default HomePage;
