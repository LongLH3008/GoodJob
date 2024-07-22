import React from "react";
import CVList from "./cv.list";

type Props = {};

const CV = (props: Props) => {
	return (
		<div className="res_layout py-10 min-h-[86.9vh] bg-gradient-to-b from-orange-100 from-5% to-zinc-100">
			<CVList />
			<div className="my-10 bg-gradient-to-r from-zinc-600 w-full to-zinc-400 h-[1px]" />
			<CVList getUpload />
		</div>
	);
};

export default CV;
