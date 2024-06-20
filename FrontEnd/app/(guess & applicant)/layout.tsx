import Navbar from "@/components/reuse/navbar";
import { Metadata } from "next";
import React, { ReactNode } from "react";

type Props = {};

export const metadata: Metadata = {
	title: {
		// Dynamic title if another page's title different with the default title
		template: "%s | GoodJob",
		default: "GoodJob",
	},
	description: "",
};

const ApplicantAndGuessLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Navbar />
			<div className="px-48">{children}</div>
		</>
	);
};

export default ApplicantAndGuessLayout;
