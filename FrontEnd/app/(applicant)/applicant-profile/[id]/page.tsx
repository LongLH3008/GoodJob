import EditProfile from "@/components/reuse/profile.edit";

type Props = {};

const page = (props: Props) => {
	return (
		<div className="res_layout pb-52 bg-zinc-100 py-10">
			<EditProfile />
		</div>
	);
};

export default page;
