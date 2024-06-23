"use client";

import React from "react";
import { Button } from "../ui/button";
import { RotateCcw, Search, X } from "lucide-react";
import { NavbarSearchState } from "@/lib/state/navbar_search.ui";
import { ScrollVerticalState } from "@/lib/state/scroll_vertical.ui";
import FilterSelect from "./navbar_search.filter";
import { Input } from "../ui/input";
import * as constanst from "@/lib/constants";

type Props = {};

export const ButtonSearch = () => {
	const { toggleSearch } = NavbarSearchState();
	return (
		<Button
			onClick={() => toggleSearch()}
			className="p-2 bg-transparent rounded-md text-primary hover:text-white hover:bg-primary hover_navbtn"
		>
			<Search strokeWidth={1.25} />
		</Button>
	);
};

export const NavSearch = (props: Props) => {
	const search = NavbarSearchState();
	const { scroll } = ScrollVerticalState();

	return (
		<div
			className={`border
			${scroll < 5 && "pt-[7%]"}
			${search.isOpen ? "opacity-1 z-10 top-0" : "-z-10 opacity-0 -top-1/2"}
			res_layout pt-[5%] h-fit fixed transition-all ease-in-out duration-500 w-full bg-white rounded-br-3xl rounded-bl-3xl border-b shadow-2xl`}
		>
			<div className="flex flex-col gap-3 pb-32 relative w-full">
				<p className="text-2xl my-5 text-center">Find your job</p>
				<div className="grid grid-cols-4 gap-3">
					<Input
						onChange={(e) => search.setFilter("job", e.target.value)}
						className="col-span-2"
						type="text"
						value={search.dataFilter.job}
						placeholder="Type your favorite Job here"
					/>
					<FilterSelect
						data={constanst.profession}
						keyFilter="profession"
						className="col-span-1"
						label="profession"
					/>
					<FilterSelect
						data={constanst.position}
						keyFilter="position"
						className="col-span-1"
						label="position"
					/>
					<FilterSelect
						data={constanst.salary}
						keyFilter="salary"
						className="col-span-1"
						label="salary"
					/>
					<FilterSelect
						data={constanst.form}
						keyFilter="workform"
						className="col-span-1"
						label="Work Form"
					/>
					<FilterSelect
						data={constanst.location}
						keyFilter="location"
						className="col-span-1"
						label="location"
					/>
					<FilterSelect data={constanst.exp} keyFilter="exp" className="col-span-1" label="exp" />
				</div>
				<div className="w-full flex justify-center absolute -bottom-8">
					{!search.isChange ? (
						<Button
							onClick={() => search.toggleSearch()}
							className="hover:bg-primary hover:scale-110 hover:rotate-90 transition-all rounded-full h-16 shadow-3xl w-16"
						>
							<X strokeWidth={1.25} />
						</Button>
					) : (
						<>
							<Button
								onClick={() => search.resetFilter()}
								className="hover:bg-primary hover:scale-110 transition-all rounded-l-full h-16 w-16 shadow-3xl"
							>
								<RotateCcw strokeWidth={1.25} />
							</Button>
							<Button className="hover:bg-primary hover:scale-110 transition-all rounded-r-full h-16 w-16 shadow-3xl">
								<Search strokeWidth={1.25} />
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
