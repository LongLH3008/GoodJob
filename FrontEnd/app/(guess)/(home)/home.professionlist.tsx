import { profession } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import { Skeleton } from "../../../components/ui/skeleton";
import SkeletonProvider from "../../../components/reuse/skeleton";

type Props = {};

const HomeProfessionCategory = (props: Props) => {
	return (
		<div className="res_layout py-16 bg-white">
			<div className="flex flex-col gap-10">
				<h2 className="text-xl text-center">Profession Category</h2>
				<div className="grid grid-cols-5 gap-5 max-lg:grid-cols-4 max-sm:grid-cols-3 max-sm:text-sm">
					<SkeletonProvider
						skeleton={
							<>
								{profession.map((item, index) => (
									<Skeleton key={index} className="p-2 h-10" />
								))}
							</>
						}
						duration={500}
					>
						<>
							{profession.map((item, index) => (
								<Link
									key={index}
									href={"/"}
									className="text-sm bg-zinc-100 font-400 text-center p-2 rounded-md hover_navbtn hover:shadow-md hover:text-white"
								>
									{item}
								</Link>
							))}
						</>
					</SkeletonProvider>
				</div>
			</div>
		</div>
	);
};

export default HomeProfessionCategory;
