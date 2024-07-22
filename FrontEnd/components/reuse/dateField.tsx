import React from "react";
import { FormField, FormItem, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "util";
import { Calendar } from "../ui/Calendar";
import { Control, FieldError, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

type Props = {
	control: Control<FieldValues>;
	name: string;
	defaultValue?: any;
	className?: string;
	label?: string;
	error?: FieldError;
	placeholder?: string;
	fromYear?: number;
	toYear?: number;
};

const DateField: React.FC<Props> = ({ control, name, defaultValue, className, label, error, placeholder }) => {
	return (
		<FormField
			control={control}
			name={name}
			defaultValue={defaultValue}
			render={({ field }) => (
				<FormItem className="flex flex-col">
					<Popover>
						{label && <p className="text-sm">{label}</p>}
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={`${cn(
									"w-full  justify-start text-left font-normal flex items-center gap-3",
									!field.value && "text-muted-foreground"
								)} ${error ? "border-red-500 validate_fail" : "border-zinc-400"}`}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								<p>
									{field.value ? (
										format(
											new Date(field.value)
												.toLocaleString("vi-VN")
												.split(" ")[1]
												.toString()
										)
									) : (
										<span>{defaultValue ? defaultValue : "Pick a date"}</span>
									)}
								</p>
							</Button>
						</PopoverTrigger>
						<PopoverContent align="start" className="w-full p-0">
							<Calendar
								className="w-full"
								mode="single"
								captionLayout="dropdown-buttons"
								selected={field.value as any}
								onSelect={field.onChange}
								fromYear={1980}
								toYear={new Date().getFullYear() - 15}
							/>
						</PopoverContent>
					</Popover>
					<FormMessage className="text-[12px]" />
				</FormItem>
			)}
		/>
	);
};

export default DateField;
