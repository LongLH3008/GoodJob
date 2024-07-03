import { Metadata } from "next";
import React from "react";
import RecommendedJobs from "./job.recommended";
import JobBanner from "./job.banner";
import ListJobs from "./job.list";
import ResultFilterJobs from "./job.filter";
import HomeProfessionCategory from "../(home)/home.professionlist";

type Props = {};

export const metadata: Metadata = {
	title: "Jobs",
};

const JobPage = (props: Props) => {
	return (
		<>
			<JobBanner />
			<div className="res_layout bg-zinc-100 pb-10">
				<ResultFilterJobs />
				<RecommendedJobs />
				<ListJobs />
			</div>
			<div className="res_layout">
				<HomeProfessionCategory />
			</div>
		</>
	);
};

export default JobPage;
