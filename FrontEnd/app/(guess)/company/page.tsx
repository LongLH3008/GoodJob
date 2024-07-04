import { Metadata } from "next";
import React from "react";
import BannerCompanyPage from "./company.banner";
import CompanyList from "./company.list";
import CompanyFilterList from "./company.filter";
import OutsandingCompany from "./company.oustanding";

type Props = {};

export const metadata: Metadata = {
	title: "Company",
};

const CompanyPage = (props: Props) => {
	return (
		<>
			<BannerCompanyPage />
			<OutsandingCompany />
			<CompanyList />
			<CompanyFilterList />
		</>
	);
};

export default CompanyPage;
