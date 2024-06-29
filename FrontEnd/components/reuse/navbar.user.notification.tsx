import { Bell, CircleAlert, CircleCheckBig, ClipboardCheck, ClipboardX, Mail, Trash2, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";

const ItemNotification = ({
	isNew,
	className,
	title,
	content,
	time,
	status,
}: {
	isNew?: boolean;
	className?: string;
	title?: string;
	content: string;
	time: string;
	status: notif_status_t | string;
}) => {
	return (
		<DropdownMenuItem
			className={`relative pb-5 flex items-start justify-between gap-5 px-5 
			${isNew && "bg-zinc-200"} ${className}`}
		>
			{status == "approve" && <ClipboardCheck strokeWidth={1.25} color="#ff9c00" />}
			{status == "reject" && <ClipboardX strokeWidth={1.25} color="red" />}
			{status == "success" && <CircleCheckBig strokeWidth={1.25} color="#ff9c00" />}
			{status == "warning" && <CircleAlert strokeWidth={1.25} color="red" />}
			{status == "new" && <Mail strokeWidth={1.25} />}
			{status == "default" && <Mail strokeWidth={1.25} />}
			<p className="text-wrap w-full text-[12.5px]">
				<strong>{title} </strong>
				{content}
			</p>
			<span className="text-[10px] absolute bottom-0 right-5">{time}</span>
		</DropdownMenuItem>
	);
};

export function Notification() {
	return (
		<DropdownMenu modal>
			<DropdownMenuTrigger className="cursor-pointer bg-transparent rounded-full" asChild>
				<Button className="p-2 relative bg-transparent rounded-md text-primary hover:text-white hover:bg-primary hover_navbtn">
					<Bell strokeWidth={1.25} />
					<span className="absolute top-1 right-1 flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff9c00] opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff9c00]"></span>
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-96">
				<DropdownMenuLabel>Notification</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<ScrollArea className="h-72 w-full">
						<ItemNotification
							isNew
							title="ccc"
							content="Message for you fkaewfgajfhfuhafouahwfoihfoaifhao
								uewfhuofawofawhfufboewufuhw uafhahofbwfiebububuo"
							time="2024-06-21T05:14:32.914Z"
							status="warning"
						/>
						<ItemNotification
							title="ccc"
							content="Message for you fkaewfgajfhfuhafouahwfoihfoaifhao
								uewfhuofawofawhfufboewufuhw uafhahofbwfiebububuo"
							time="2024-06-21T05:14:32.914Z"
							status="reject"
						/>
						<ItemNotification
							title="ccc"
							content="Message for you fkaewfgajfhfuhafouahwfoihfoaifhao
								uewfhuofawofawhfufboewufuhw uafhahofbwfiebububuo"
							time="2024-06-21T05:14:32.914Z"
							status="approve"
						/>
					</ScrollArea>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<Button className="hover:bg-[red] hover:text-white bg-transparent text-primary p-2 h-fit w-full">
					<Trash2 className="mr-2 h-4 w-4" />
					<span>Delete all</span>
				</Button>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
