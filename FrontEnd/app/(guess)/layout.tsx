import Footer from "@/components/reuse/footer";
import Navbar from "@/components/reuse/navbar";
import ScrollToTop from "@/components/reuse/scrolltotop";
import { Metadata } from "next";
import React, { ReactNode } from "react";

type Props = {};

export const metadata: Metadata = {
	title: {
		// Dynamic title if another page's title different with the default title
		template: `%s | GoodJob`,
		default: "GoodJob",
	},
	description: "",
};

const ApplicantAndGuessLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="relative">
			<Navbar />
			<div className="lg:pb-[250px]">{children}</div>
			<Footer />
			<ScrollToTop />
		</div>
	);
};

export default ApplicantAndGuessLayout;
