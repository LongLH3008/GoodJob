import React, { ReactNode } from "react";
import { FormControl, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const FieldItem = (invalid: boolean, field: any, icon?: ReactNode, placeholder?: string, label?: string) => {
	return (
		<FormItem>
			<FormControl>
				{label && !icon && <p>{label}</p>}
				<div className={`relative ${invalid && "text-red-500 validate_fail"}`}>
					{!label && icon && icon}
					<Input
						type="password"
						className={`w-full ${!label && icon && "pl-12"} ${invalid && "border-red-500"}`}
						placeholder={placeholder}
						{...field}
					/>
				</div>
			</FormControl>
			<FormMessage className="text-[12px]" />
		</FormItem>
	);
};

export default FieldItem;
