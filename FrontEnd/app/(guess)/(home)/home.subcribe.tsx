import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {};

const HomeSubscribe = (props: Props) => {
	return (
		<div className="res_layout py-[3%] h-fit">
			<div className="w-full border-y sm:flex sm:justify-center items-center py-[6%]">
				<div className="w-full flex flex-col gap-y-10 items-center h-full">
					<h2 className="text-2xl">
						Keep yourself <span className="text-[#ff9c00]">up to date</span>
					</h2>
					<p className="text-[15px] text-center">
						Join our weekly GoodJob digest and <br /> be the first one to know about new
						positions
					</p>
					<div className="flex justify-center w-full items-center gap-2">
						<Input
							type="email"
							placeholder="Email"
							className="w-1/2 md:w-1/3 p-6 rounded-full"
						/>
						<Button type="submit" className="hover_navbtn p-6 rounded-full">
							Subscribe
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeSubscribe;
