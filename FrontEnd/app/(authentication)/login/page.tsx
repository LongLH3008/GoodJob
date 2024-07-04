"use client";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"; // Điều chỉnh đường dẫn tùy vào cấu trúc dự án của bạn
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { loginValidate } from "@/lib/schemas/auth";
import { KeyRound, Lock, LockOpen, Unplug, UserRound, X } from "lucide-react";
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { SwrExecute } from "@/lib/hooks/swr";

const LoginPage = () => {
	const { toast } = useToast();
	const [isSubmit, setIsSubmit] = useState<boolean>(false);
	const router = useRouter();

	const { trigger } = useSWRMutation("/auth/login", SwrExecute, {
		onSuccess: (data) => {
			toast({
				title: `${data.message}`,
				description: `Welcome ${data.metadata.user.split("@")[0]}`,
				action: <LockOpen strokeWidth={1.25} color="#ff9c00" />,
				duration: 5000,
			});
			router.push("/dashboard");
		},
		onError: (error) => {
			toast({
				title: "Login failed",
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

	const form = useForm<ILogin>({
		resolver: joiResolver(loginValidate),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(dt: ILogin) {
		await trigger({ method: "POST", formdata: dt });
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
						<h1 className="text-2xl font-semibold tracking-tight">Login</h1>
						<p className="text-sm text-muted-foreground">Enter your email below</p>
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
								<Button disabled={isSubmit} type="submit" className="mt-2">
									{isSubmit ? <PulseLoader color="#000000" /> : "Login"}
								</Button>
							</form>
						</Form>
					</div>
					<Link
						href={"/forgot"}
						className="hover:text-[#ff9c00] hover:underline text-[12px] text-center"
					>
						Oops ! I forgot my password
					</Link>
					<Link
						href={"/register"}
						className="hover:text-[#ff9c00] hover:underline text-[12px] text-center"
					>
						Don't have an account ? Register here ...
					</Link>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
