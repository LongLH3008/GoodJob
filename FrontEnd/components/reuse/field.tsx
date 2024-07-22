import React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Control, FieldError, FieldValues } from "react-hook-form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";

type Props = {
	control: Control<FieldValues>;
	name: string;
	defaultValue?: any;
	className?: string;
	id?: string;
	label?: string;
	error?: FieldError;
	placeholder?: string;
	type?: string;
	renderKey?: any;
	dataSelect?: any[];
	onChangefunc?: (arg?: any) => void;
};

const Field: React.FC<Props> = ({
	control,
	name,
	defaultValue,
	className,
	id,
	label,
	error,
	placeholder,
	type = "text",
	dataSelect,
	renderKey,
	onChangefunc,
}) => {
	return (
		<FormField
			control={control}
			name={name}
			defaultValue={defaultValue}
			render={({ field }) => (
				<FormItem>
					{type !== "select" && !dataSelect ? (
						<FormControl>
							<div
								className={`relative ${
									error ? "text-red-500 validate_fail" : ""
								} ${className}`}
							>
								{label && <p className="text-sm mb-2">{label}</p>}

								<Input
									id-={id}
									type={type}
									className={cn(
										`w-full pl-5 ${error ? "border-red-500" : ""} ${className}`
									)}
									placeholder={placeholder}
									{...field}
								/>
							</div>
						</FormControl>
					) : (
						<>
							{label && <p className="text-sm mb-2">{label}</p>}
							<Select
								onValueChange={(value) => {
									field.onChange(value);
									onChangefunc && onChangefunc(value);
								}}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder={placeholder} />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{dataSelect?.map((item, index) => (
										<SelectItem
											key={index}
											value={renderKey ? item[renderKey] : item}
										>
											{renderKey ? item[renderKey] : item}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</>
					)}
					<FormMessage className="text-[12px]" />
				</FormItem>
			)}
		/>
	);
};

export default Field;
