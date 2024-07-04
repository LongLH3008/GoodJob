"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import { CompanySearchState } from "./state";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { location } from "@/lib/constants";

type Props = {};

const BannerCompanyPage = (props: Props) => {
	const { setSearch, resetSearch, companySearch } = CompanySearchState();
	const [open, setOpen] = React.useState(false);
	console.log(CompanySearchState());
	return (
		<div className="res_layout w-full h-56 bg-gradient-to-b from-orange-100	 from-20% to-zinc-100 flex justify-center items-center">
			<div className="flex flex-col gap-3 w-1/2 max-xl:w-3/4 max-md:w-full">
				<p className="text-2xl max-sm:text-lg text-center text-zinc-700">
					Look up <span className="text-[#ff9c00]">company</span> information <br /> and find the
					<span className="text-[#ff9c00]"> best place</span> to work for you
				</p>
				<div className="mt-2 flex w-full items-center space-x-2 h-12 px-5 rounded-full shadow-lg bg-white">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								role="combobox"
								aria-expanded={open}
								className="w-[200px] justify-between border-0 border-r rounded-none text-zinc-500 text-sm"
							>
								{companySearch.location
									? location.find((item) => item === companySearch.location)
									: "Location"}
								<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[200px] p-0 ">
							<Command>
								<CommandInput placeholder="Location" />
								<CommandList>
									<CommandEmpty>No location found.</CommandEmpty>
									<CommandGroup className="text-zinc-500">
										<CommandItem
											onSelect={() => {
												resetSearch();
												setOpen(false);
											}}
										>
											<Check
												className={cn(
													"mr-2 h-4 w-4",
													companySearch.location === ""
														? "opacity-100"
														: "opacity-0"
												)}
											/>
											All
										</CommandItem>
										{location.map((item) => (
											<CommandItem
												key={item}
												value={item}
												onSelect={(current) => {
													setSearch(
														"location",
														current === companySearch.location
															? ""
															: current
													);
													setOpen(false);
												}}
											>
												<Check
													className={cn(
														"mr-2 h-4 w-4",
														companySearch.location === item
															? "opacity-100"
															: "opacity-0"
													)}
												/>
												{item}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
					<Input
						type="text"
						onChange={(e) => setSearch("name", e.target.value)}
						placeholder="Type name company"
						className="border-none h-full w-full bg-white"
					/>
					<Search strokeWidth={1} size={22} />
				</div>
			</div>
		</div>
	);
};

export default BannerCompanyPage;
