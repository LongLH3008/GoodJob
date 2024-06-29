"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { instance } from "@/lib/api/api";
import { SwrExecute } from "@/lib/hooks/swr";
import { registerValidate } from "@/lib/schemas";
import { joiResolver } from "@hookform/resolvers/joi";
import { KeyRound, Lock, Unplug, UserCheck, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PulseLoader from "react-spinners/PulseLoader";
import useSWRMutation from "swr/mutation";

type Props = {};

const RegisterPage = (props: Props) => {
	const { toast } = useToast();
	const router = useRouter();
	const [isSubmit, setIsSubmit] = useState<boolean>(false);

	const { trigger } = useSWRMutation("/auth/register", SwrExecute, {
		onSuccess: (data) => {
			toast({
				title: `Register Success`,
				description: `Welcome to GoodJob`,
				content: "Let's login right now",
				action: <UserCheck strokeWidth={1.25} color="#ff9c00" />,
				duration: 5000,
			});
			router.replace("/login");
		},
		onError: (error) => {
			toast({
				title: "Register failed",
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

	const form = useForm<IRegister>({
		resolver: joiResolver(registerValidate),
		defaultValues: {
			email: "",
			password: "",
			confirmpassword: "",
		},
	});

	async function onSubmit(data: IRegister) {
		await trigger({ method: "POST", formdata: data });
		setIsSubmit(true);
		setTimeout(() => setIsSubmit(false), 1500);
	}

	return (
		<>
			<Link
				href={"/"}
				className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-[#ff9c00] hover:text-white hover:text-accent-foreground p-1 absolute right-4 top-4 md:right-8 md:top-8"
			>
				<X />
			</Link>
			<div className="lg:p-8 w-full">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight">Register</h1>
						<p className="text-sm text-muted-foreground">Enter your information below</p>
					</div>
					<div className="grid gap-6">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div
													className={`relative ${
														form.getFieldState("email").error &&
														"text-red-500 validate_fail"
													}`}
												>
													<UserRound
														strokeWidth={1}
														className="absolute left-3 h-full"
													/>
													<Input
														type="text"
														className={`w-full pl-12 ${
															form.getFieldState("email")
																.error &&
															"border-red-500"
														}`}
														placeholder="Email"
														{...field}
													/>
												</div>
											</FormControl>
											<FormMessage className="text-[12px]" />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div
													className={`relative ${
														form.getFieldState("password")
															.error &&
														"text-red-500 validate_fail"
													}`}
												>
													<KeyRound
														strokeWidth={1}
														className="absolute left-3 h-full"
													/>
													<Input
														type="password"
														className={`w-full pl-12 ${
															form.getFieldState("password")
																.error &&
															"border-red-500"
														}`}
														placeholder="Password"
														{...field}
													/>
												</div>
											</FormControl>
											<FormMessage className="text-[12px]" />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="confirmpassword"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div
													className={`relative ${
														form.getFieldState(
															"confirmpassword"
														).error &&
														"text-red-500 validate_fail"
													}`}
												>
													<KeyRound
														strokeWidth={1}
														className="absolute left-3 h-full"
													/>
													<Input
														type="password"
														className={`w-full pl-12 ${
															form.getFieldState(
																"confirmpassword"
															).error && "border-red-500"
														}`}
														placeholder="Confirm Password"
														{...field}
													/>
												</div>
											</FormControl>
											<FormMessage className="text-[12px]" />
										</FormItem>
									)}
								/>
								<div className="relative my-3">
									<div className="absolute inset-0 flex items-center">
										<span className="w-full border-t"></span>
									</div>
									<div className="relative flex justify-center text-xs uppercase">
										<span className="bg-background px-2 text-muted-foreground">
											What is your role ?
										</span>
									</div>
								</div>
								<FormField
									control={form.control}
									name="user_role"
									render={({ field }) => (
										<FormItem>
											<Select
												onValueChange={field.onChange}
												defaultValue=""
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Choose your role" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="Applicant">
														Applicant
													</SelectItem>
													<SelectItem value="Employer">
														Employer
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage className="text-[12px]" />
										</FormItem>
									)}
								/>
								<Button disabled={isSubmit} type="submit" className="mt-2">
									{isSubmit ? <PulseLoader color="#000000" /> : "Register"}
								</Button>
							</form>
						</Form>
					</div>
					<Link
						href={"/login"}
						className="hover:text-[#ff9c00] hover:underline text-[12px] text-center"
					>
						Login
					</Link>
				</div>
			</div>
		</>
	);
};

export default RegisterPage;
