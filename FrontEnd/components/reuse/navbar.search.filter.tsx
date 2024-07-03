"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, CirclePlus } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { FilterJob, Search } from "@/lib/hooks/navbar_search.ui";

const FilterSelect = ({
	data,
	keyFilter,
	label,
	className,
}: {
	data: string[];
	keyFilter: keyof Search["dataFilter"];
	label: string;
	className?: string;
}) => {
	const [open, setOpen] = React.useState(false);
	const search = FilterJob();

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn(`justify-between shadow-md border-none capitalize ${className}`)}
				>
					<div className="flex max-lg:gap-3 gap-5 max-md:text-[13px] items-center overflow-hidden">
						<CirclePlus className="text-zinc-500 max-sm:hidden" strokeWidth={1.25} />
						{label} :{" "}
						{search.dataFilter[`${keyFilter}`] !== ""
							? search.dataFilter[`${keyFilter}`]
							: "All"}
					</div>
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className={cn(`p-0 w-[400px]`)}>
				<Command>
					<CommandInput placeholder="Search item..." />
					<CommandList>
						<CommandEmpty>Not found...</CommandEmpty>
						<CommandGroup>
							<ScrollArea className="w-full h-32">
								<CommandItem
									value=""
									onSelect={() => {
										search.setFilter(keyFilter, "");
										setOpen(false);
									}}
									className="overflow-hidden"
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											search.dataFilter[`${keyFilter}`] === ""
												? "opacity-100"
												: "opacity-0"
										)}
									/>
									All
								</CommandItem>
								{data.map((item, index) => (
									<CommandItem
										key={index}
										value={item}
										onSelect={() => {
											search.setFilter(keyFilter, item);
											setOpen(false);
										}}
										className="capitalize overflow-hidden"
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												search.dataFilter[`${keyFilter}`] === item
													? "opacity-100"
													: "opacity-0"
											)}
										/>
										{item}
									</CommandItem>
								))}
							</ScrollArea>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default FilterSelect;
