import Profile from "@/components/reuse/profile";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
	title: {
		template: "",
		default: "Your Profile",
	},
	description: "",
};

const page = (props: Props) => {
	return (
		<div className="res_layout lg:pb-64 bg-zinc-100 py-10">
			<Profile />
		</div>
	);
};

export default page;
