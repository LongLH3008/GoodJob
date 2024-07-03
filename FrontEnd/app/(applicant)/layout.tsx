import Footer from "@/components/reuse/footer";
import Navbar from "@/components/reuse/navbar";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
	title: {
		// Dynamic title if another page's title different with the default title
		template: "%s | GoodJob",
		default: "GoodJob",
	},
	description: "",
};

const ApplicantLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
};

export default ApplicantLayout;
