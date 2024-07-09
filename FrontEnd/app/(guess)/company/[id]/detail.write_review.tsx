import { Button } from "@/components/ui/button";
import { Angry, Frown, Lock, Meh, Smile, SmilePlus, Unplug, X } from "lucide-react";
import React, { useState } from "react";
import { UserState } from "@/lib/hooks/user";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import useSWRMutation from "swr/mutation";
import { SwrExecute } from "@/lib/hooks/swr";
import { socket } from "@/lib/api/socket";
import { toast } from "@/components/ui/use-toast";

type Review = {
	vote: "" | vote_t;
	content: string;
};

const validate = Joi.object({
	vote: Joi.any().required(),
	content: Joi.string().required().min(10).max(1000).messages({
		"any.empty": "Review not allow empty",
		"string.required": "Review required",
		"string.max": "Review at most 1000 characters",
		"string.min": "Review at least 10 characters",
	}),
});

const WriteReview = ({ company_id }: { company_id: string }) => {
	const [vote, setVote] = useState("");
	const { id } = UserState();
	const [open, setOpen] = useState(false);
	const form = useForm<Review>({
		resolver: joiResolver(validate),
	});

	const { trigger } = useSWRMutation(`/review`, SwrExecute, {
		onSuccess: (data) => {
			setOpen(false);
			socket.emit("getReview", company_id);
		},
		onError: async (error) => {
			toast({
				title: "Review failed",
				description: error.response
					? error.response.data
					: "Could not connect to server. Please try again later",
				duration: 3500,
				action: error.response ? (
					<Lock strokeWidth={1.25} className="text-red-500" />
				) : (
					<Unplug strokeWidth={1.25} className="text-red-500" />
				),
			});
		},
	});
	const onSubmit = (dt: any) => {
		trigger({ method: "POST", formdata: { ...dt, applicant_id: id, company_id } });
	};

	return (
		<Dialog open={open}>
			<DialogTrigger asChild>
				<Button onClick={() => setOpen(true)} variant="outline">
					Write your review
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px] max-w-[425px]">
				<DialogHeader className="relative">
					<DialogTitle className="text-lg font-medium text-zinc-800">
						How do you feel about this Company ?
					</DialogTitle>
					<X
						onClick={() => setOpen(false)}
						strokeWidth={1.25}
						className="cursor-pointer h-4 w-4 absolute -right-2 -top-2"
					/>
				</DialogHeader>

				<div className="flex justify-start items-center gap-14">
					<SmilePlus
						onClick={() => {
							setVote("Very_Good");
							form.setValue("vote", "Very_Good" as vote_t);
							form.clearErrors();
						}}
						className={`${
							vote == "Very_Good" ? "scale-150 text-orange-500" : "hover:scale-150"
						} cursor-pointer duration-300`}
						strokeWidth={1.25}
						size={20}
					/>
					<Smile
						onClick={() => {
							setVote("Good");
							form.setValue("vote", "Good" as vote_t);
							form.clearErrors();
						}}
						className={`${
							vote == "Good" ? "scale-150 text-orange-500" : "hover:scale-150"
						} cursor-pointer duration-300`}
						strokeWidth={1.25}
						size={20}
					/>
					<Meh
						onClick={() => {
							setVote("Average");
							form.setValue("vote", "Average" as vote_t);
							form.clearErrors();
						}}
						className={`${
							vote == "Average" ? "scale-150 text-orange-500" : "hover:scale-150"
						} cursor-pointer duration-300`}
						strokeWidth={1.25}
						size={20}
					/>
					<Frown
						onClick={() => {
							setVote("Poor");
							form.setValue("vote", "Poor" as vote_t);
							form.clearErrors();
						}}
						className={`${
							vote == "Poor" ? "scale-150 text-orange-500" : "hover:scale-150"
						} cursor-pointer duration-300`}
						strokeWidth={1.25}
						size={20}
					/>
					<Angry
						onClick={() => {
							setVote("Terrible");
							form.setValue("vote", "Terrible" as vote_t);
							form.clearErrors();
						}}
						className={`${
							vote == "Terrible" ? "scale-150 text-orange-500" : "hover:scale-150"
						} cursor-pointer duration-300`}
						strokeWidth={1.25}
						size={20}
					/>
				</div>

				{form.getFieldState("vote").error && (
					<p className="text-sm text-red-500">How is your feeling ?</p>
				)}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem className="flex flex-col w-full mt-5">
									<p className="text-sm">Write your review</p>
									<FormControl>
										<textarea
											placeholder="Write your review"
											className="resize-none border p-5 text-sm outline-none ring-0 min-h-[25dvh]"
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-sm" />
								</FormItem>
							)}
						/>
						<Button className="w-full" variant="default" type="submit">
							Send
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default WriteReview;
