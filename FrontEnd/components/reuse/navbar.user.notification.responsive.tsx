import { Button } from "@/components/ui/button";

import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
	Bell,
	CircleAlert,
	CircleCheckBig,
	CircleDashed,
	ClipboardCheck,
	ClipboardX,
	Mail,
	Trash,
	Trash2,
} from "lucide-react";

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
		<div
			className={`relative p-2 pb-5 flex items-start justify-between gap-5
			${isNew && "bg-zinc-100"} ${className}`}
		>
			{status == "approve" && <ClipboardCheck strokeWidth={1.25} className="w-8 h-8" />}
			{status == "reject" && <ClipboardX strokeWidth={1.25} className="w-8 h-8" />}
			{status == "success" && <CircleCheckBig strokeWidth={1.25} className="w-8 h-8" />}
			{status == "warning" && <CircleAlert strokeWidth={1.25} className="w-8 h-8" />}
			{status == "new" && <Mail strokeWidth={1.25} className="w-8 h-8" />}
			{status == "default" && <Mail strokeWidth={1.25} className="w-8 h-8" />}
			<p className="text-wrap w-full text-[12.5px]">
				<strong>{title} </strong>
				{content}
			</p>
			<span className="text-[10px] absolute bottom-0 right-5">{time}</span>
		</div>
	);
};

export function NotificationResponsive() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="p-2 relative bg-transparent rounded-md text-primary hover:text-white hover_navbtn">
					<Bell strokeWidth={1.25} />
					<span className="absolute top-1 right-1 flex h-2 w-2">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff9c00] opacity-75"></span>
						<span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff9c00]"></span>
					</span>
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className="text-left pb-5 border-b flex items-center gap-3">
						<Bell strokeWidth={1.25} />
						<p className="font-semibold text-sm">Notification</p>
					</SheetTitle>
				</SheetHeader>
				<div className="grid grid-rows-12 gap-4 py-4 pb- text-sm h-full justify-between">
					<div className="h-full w-full row-span-11 overflow-y-scroll">
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
							status="warning"
						/>
						<ItemNotification
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
							status="warning"
						/>
						<ItemNotification
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
							status="warning"
						/>
						<ItemNotification
							title="ccc"
							content="Message for you fkaewfgajfhfuhafouahwfoihfoaifhao
								uewfhuofawofawhfufboewufuhw uafhahofbwfiebububuo"
							time="2024-06-21T05:14:32.914Z"
							status="warning"
						/>
					</div>
					<div className="row-span-3 border-t pt-3">
						<SheetClose asChild>
							<Button className="flex w-full items-center gap-3 text-sm">
								<Trash2 strokeWidth={1.25} className="mr-2 h-5 w-5" />
								<span>Remove all</span>
							</Button>
						</SheetClose>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
