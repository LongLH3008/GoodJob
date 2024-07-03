"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "util";
import { AtSign, CalendarIcon, Check, CircleCheckBig, Lock, RotateCcw, UnplugIcon, UserCheck } from "lucide-react";
import { Calendar } from "./Calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { province } from "@/lib/constants/location";
import { joiResolver } from "@hookform/resolvers/joi";
import { UserSchema } from "@/lib/schemas/user";
import { ContactState, InfoState, UserState } from "@/lib/hooks/user";
import useSWRMutation from "swr/mutation";
import { SwrExecute } from "@/lib/hooks/swr";
import { toast } from "../ui/use-toast";
import { useParams } from "next/navigation";
import { getUser } from "@/lib/api/auth";
import ProfileAvatar from "./profile.avatar";
import { handleDeleteImage, handleUpload, uploadState } from "@/lib/hooks/useCloudinary";
import SkeletonProvider from "./skeleton";
import { Skeleton } from "../ui/skeleton";
import PulseLoader from "react-spinners/PulseLoader";

const Profile = () => {
	const { email, user_role } = UserState();
	const { detail_address, district: dist, city: cit, phone, ward } = ContactState();
	const { avatar, birth, company_role, gender, name } = InfoState();
	const { file, remove, setUpload } = uploadState();

	const { id } = useParams();
	const [city, setCity] = useState<any | string[]>([]);
	const [district, setDistrict] = useState<any | string[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const form = useForm({
		resolver: joiResolver(UserSchema),
	});

	const { trigger } = useSWRMutation(`/user/info/${id}`, SwrExecute, {
		onSuccess: async () => {
			toast({
				description: `Update info successfully`,
				action: <UserCheck strokeWidth={1.25} color="#ff9c00" />,
				duration: 5000,
			});
			await getUser(id as string);
			setLoading(false);
		},
		onError: (error: any) => {
			toast({
				title: "Update info failed",
				description: error.response
					? error.response.data
					: "Could not connect to server. Please try again later",
				duration: 3500,
				action: error.response ? (
					<Lock strokeWidth={1.25} className="text-red-500" />
				) : (
					<UnplugIcon strokeWidth={1.25} className="text-red-500" />
				),
			});
			setLoading(false);
		},
	});

	const onSubmit = async (formdata: any) => {
		setLoading(true);
		console.log(UserState.getState().id);
		let method = (InfoState.getState().user_id ? "PUT" : "POST") as RequestMethod;
		formdata.birth = new Date(formdata.birth).toLocaleString("vi-VN").split(" ")[1];
		if (file !== null) {
			const img = await handleUpload(file as File);
			InfoState.getState().avatar !== "" &&
				(await handleDeleteImage(InfoState.getState().avatar as string));
			formdata.avatar = img?.src.replace("http", "https");
		}
		if (remove == true && InfoState.getState().avatar !== "") {
			await handleDeleteImage(InfoState.getState().avatar as string);
			formdata.avatar = "";
		}
		trigger({ method, formdata });
	};

	return (
		<SkeletonProvider
			skeleton={
				<>
					<div className="flex justify-between items-start gap-3 max-lg:flex-wrap">
						<div className="w-fit max-lg:w-full max-md:flex max-md:justify-between max-md:items-end bg-white rounded-xl h-fit p-5">
							<Skeleton className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] mb-5 overflow-hidden rounded-full" />
						</div>
						<div className="w-full h-fit py-10 flex flex-col gap-2 md:grid md:grid-cols-2 bg-white rounded-xl">
							<div className="h-full w-full col-span-1 md:px-10 py-7 flex flex-col justify-between gap-2 max-lg:px-5 md:border-r">
								<div className="flex flex-col gap-2">
									<Skeleton className="w-full  h-16" />
									<Skeleton className="w-full  h-16" />
									<Skeleton className="w-full  h-16" />
									<Skeleton className="w-full  h-16" />
									<Skeleton className="w-full  h-16" />
								</div>
							</div>
							<div className="lg:border-right h-full w-full col-span-1 md:px-10 py-7 flex flex-col gap-2 max-lg:px-5">
								<Skeleton className="w-full  h-16" />
								<Skeleton className="w-full  h-16" />
								<Skeleton className="w-full  h-16" />
								<Skeleton className="w-full  h-16" />
							</div>
						</div>
					</div>
				</>
			}
			duration={1000}
		>
			<Form {...form}>
				<div className="flex justify-between items-start gap-3 max-lg:flex-wrap">
					<div className="w-fit max-lg:w-full max-md:flex max-md:justify-between max-md:items-end bg-white rounded-xl h-fit p-5">
						<ProfileAvatar avatarSrc={avatar as string} />
						<div className="mt-2 flex items-center text-[13px]">
							<AtSign size={16} strokeWidth={1.25} /> {email}
							<p className="max-sm:hidden"> / {user_role}</p>
						</div>
					</div>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full h-fit py-10 flex flex-col gap-2 md:grid md:grid-cols-2 bg-white rounded-xl"
					>
						<div className="h-full w-full col-span-1 md:px-10 py-7 flex flex-col justify-between gap-2 max-lg:px-5 md:border-r">
							<div className="flex flex-col gap-2">
								<FormField
									control={form.control}
									name="name"
									defaultValue={name}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<div
													className={`relative ${
														form.getFieldState("name").error &&
														"text-red-500 validate_fail"
													}`}
												>
													<p className="text-sm mb-2">Your Name</p>
													<Input
														type="text"
														className={`w-full  pl-5 ${
															form.getFieldState("name")
																.error &&
															"border-red-500"
														}`}
														placeholder="Enter your name"
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
									name="birth"
									defaultValue={birth}
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<Popover>
												<p className="text-sm">Birth</p>
												<PopoverTrigger asChild>
													<Button
														variant={"outline"}
														className={cn(
															"border-zinc-400 w-full  justify-start text-left font-normal flex items-center gap-3",
															!field.value &&
																"text-muted-foreground"
														)}
													>
														<CalendarIcon className="mr-2 h-4 w-4" />
														<p>
															{field.value ? (
																format(
																	new Date(
																		field.value
																	)
																		.toLocaleString(
																			"vi-VN"
																		)
																		.split(
																			" "
																		)[1]
																		.toString()
																)
															) : (
																<span>
																	{birth
																		? birth
																		: "Pick a date"}
																</span>
															)}
														</p>
													</Button>
												</PopoverTrigger>
												<PopoverContent
													align="start"
													className="w-full p-0"
												>
													<Calendar
														className="w-full"
														mode="single"
														captionLayout="dropdown-buttons"
														selected={field.value as any}
														onSelect={field.onChange}
														fromYear={1980}
														toYear={
															new Date().getFullYear() - 15
														}
													/>
												</PopoverContent>
											</Popover>
											<FormMessage className="text-[12px]" />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="gender"
									defaultValue={gender}
									render={({ field }) => (
										<FormItem className="w-full ">
											<p className="text-sm">Gender</p>
											<Select onValueChange={field.onChange}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder={gender} />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="Male">Male</SelectItem>
													<SelectItem value="Female">
														Female
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage className="text-[12px]" />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="company_role"
									defaultValue={company_role}
									render={({ field }) => (
										<FormItem className="w-full ">
											<p className="text-sm">Company role</p>
											<Select onValueChange={field.onChange}>
												<FormControl>
													<SelectTrigger>
														<SelectValue
															placeholder={company_role}
														/>
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="Employee">
														Employee
													</SelectItem>
													<SelectItem value="Manager">
														Manager
													</SelectItem>
													<SelectItem value="Director">
														Director
													</SelectItem>
													<SelectItem value="CEO">CEO</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage className="text-[12px]" />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="city"
									defaultValue={cit}
									render={({ field }) => (
										<FormItem className="w-full ">
											<p className="text-sm">City / Province</p>
											<Select
												onValueChange={(value) => {
													field.onChange(value);
													setCity(
														province.find(
															(item) => item.name == value
														)?.district
													);
												}}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder={cit} />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{province
														.sort((a, b) =>
															a.name.localeCompare(b.name)
														)
														.map((city, index) => (
															<SelectItem
																key={index}
																value={city.name}
															>
																{city.name}
															</SelectItem>
														))}
												</SelectContent>
											</Select>
											<FormMessage className="text-[12px]" />
										</FormItem>
									)}
								/>
							</div>
						</div>
						<div className="lg:border-right h-full w-full col-span-1 md:px-10 py-7 flex flex-col gap-2 max-lg:px-5">
							<FormField
								control={form.control}
								name="district"
								defaultValue={dist}
								render={({ field }) => (
									<FormItem className="w-full ">
										<p className="text-sm">District / Township</p>
										<Select
											onValueChange={(value) => {
												field.onChange(value);
												setDistrict(
													city.find(
														(item: any) => item.name == value
													)?.ward
												);
											}}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder={dist} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{city
													.sort()
													.map((district: any, index: number) => (
														<SelectItem
															key={index}
															value={district.name}
														>
															{district.name}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
										<FormMessage className="text-[12px]" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="ward"
								defaultValue={ward}
								render={({ field }) => (
									<FormItem className="w-full ">
										<p className="text-sm">Ward / Commune / Town</p>
										<Select onValueChange={field.onChange}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder={ward} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{district &&
													district
														.sort()
														.map((ward: any, index: number) => (
															<SelectItem
																key={index}
																value={ward.name}
															>
																{ward.name}
															</SelectItem>
														))}
											</SelectContent>
										</Select>
										<FormMessage className="text-[12px]" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="detail_address"
								defaultValue={detail_address}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div
												className={`relative ${
													form.getFieldState("detail_address")
														.error &&
													"text-red-500 validate_fail"
												}`}
											>
												<p className="text-sm mb-2">No. ...</p>
												<Input
													type="text"
													className={`w-full  pl-5 ${
														form.getFieldState("detail_address")
															.error && "border-red-500"
													}`}
													placeholder="House"
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
								name="phone"
								defaultValue={phone}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div
												className={`relative ${
													form.getFieldState("phone").error &&
													"text-red-500 validate_fail"
												}`}
											>
												<p className="text-sm mb-2">Phone number</p>
												<Input
													type="text"
													className={`w-full  pl-5 ${
														form.getFieldState("phone").error &&
														"border-red-500"
													}`}
													placeholder="Enter your phone"
													{...field}
													// defaultValue={phone}
												/>
											</div>
										</FormControl>
										<FormMessage className="text-[12px]" />
									</FormItem>
								)}
							/>
						</div>
						<div className="col-span-2 flex justify-center gap-2 items-start mt-5">
							<Button
								className="p-10 py-6 hover_navbtn"
								type="reset"
								onClick={() => {
									form.reset({
										name,
										birth,
										gender,
										company_role,
										ward,
										phone,
										detail_address: detail_address,
										city: cit,
										district: dist,
									});
									setUpload({
										file: null,
										demo: "",
										remove: false,
									});
								}}
							>
								<RotateCcw strokeWidth={1.25} className="mr-2" />
								Reset
							</Button>
							<Button
								disabled={loading}
								className="p-10 py-6 hover_navbtn flex items-center justify-center"
								type="submit"
							>
								{loading ? (
									<PulseLoader color="#000000" size={8} />
								) : (
									<>
										Save
										<Check strokeWidth={1.25} className="ml-2" />
									</>
								)}
							</Button>
						</div>
					</form>
				</div>
			</Form>
		</SkeletonProvider>
	);
};

export default Profile;
