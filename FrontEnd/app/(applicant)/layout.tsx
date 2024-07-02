import Footer from "@/components/reuse/footer";
import Navbar from "@/components/reuse/navbar";
import { ReactNode } from "react";

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
