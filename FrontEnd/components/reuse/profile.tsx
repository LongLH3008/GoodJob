"use client";
import React, { useState } from "react";
import { province } from "@/lib/constants/location";
import { joiResolver } from "@hookform/resolvers/joi";
import { UserSchema } from "@/lib/schemas/user";
import { ContactState, InfoState, UserState } from "@/lib/hooks/user";
import { SwrExecute } from "@/lib/hooks/swr";
import { getUser } from "@/lib/api/auth";
import { handleDeleteFile, handleUpload, uploadState } from "@/lib/hooks/useCloudinary";
import useSWRMutation from "swr/mutation";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";

import { AtSign, Check, Lock, RotateCcw, UnplugIcon, UserCheck } from "lucide-react";

const PulseLoader = dynamic(() => import("react-spinners/PulseLoader"));
const ProfileAvatar = dynamic(() => import("./profile.avatar"));
const SkeletonProvider = dynamic(() => import("./skeleton"));
const Skeleton = dynamic(() => import("../ui/skeleton").then((mod) => mod.Skeleton));
const Field = dynamic(() => import("./field"));
const DateField = dynamic(() => import("./dateField"));

const Profile = () => {
	const { email } = UserState();
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

	const changeCity = (value: string) => {
		setCity(province.find((item) => item.name == value)?.district);
	};

	const changeDistrict = (value: string) => {
		setDistrict(city.find((item: any) => item.name == value)?.ward);
	};

	const { trigger } = useSWRMutation(`/user/info/${id}`, SwrExecute, {
		onSuccess: async () => {
			const { toast } = await import("../ui/use-toast");
			toast({
				description: `Update info successfully`,
				action: <UserCheck strokeWidth={1.25} color="#ff9c00" />,
				duration: 5000,
			});
			await getUser(id as string);
			setLoading(false);
		},
		onError: async (error: any) => {
			const { toast } = await import("../ui/use-toast");
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
		console.log(UserState.getState().id, InfoState.getState().user_id);
		let method = (InfoState.getState().user_id ? "PUT" : "POST") as RequestMethod;
		formdata.birth = new Date(formdata.birth).toLocaleString("vi-VN").split(" ")[1];
		if (file !== null) {
			const img = await handleUpload(file as File);
			InfoState.getState().avatar !== "" && (await handleDeleteFile(InfoState.getState().avatar as string));
			formdata.avatar = img?.src.replace("http", "https");
		}
		if (remove == true && InfoState.getState().avatar !== "") {
			await handleDeleteFile(InfoState.getState().avatar as string);
			formdata.avatar = "";
		}
		if (formdata.avatar == null) formdata.avatar = "";
		trigger({ method, formdata });
	};

	return (
		<>
			<p className="text-lg mb-5 font-semibold">Your Profile</p>
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
							</div>
						</div>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full h-fit py-10 flex flex-col gap-2 md:grid md:grid-cols-2 bg-white rounded-xl"
						>
							<div className="h-full w-full col-span-1 md:px-10 py-7 flex flex-col justify-between gap-2 max-lg:px-5 md:border-r">
								<div className="flex flex-col gap-2">
									<Field
										control={form.control}
										name="name"
										defaultValue={name}
										label="Your Name"
										error={form.getFieldState("name").error}
										placeholder="Enter your name"
									/>
									<DateField
										control={form.control}
										name="birth"
										defaultValue={birth}
										label="Date of birth"
										error={form.getFieldState("birth").error}
									/>
									<Field
										control={form.control}
										name="gender"
										defaultValue={gender}
										label="Gender"
										error={form.getFieldState("gender").error}
										type="select"
										placeholder={gender}
										dataSelect={["Male", "Female"]}
									/>
									<Field
										control={form.control}
										name="company_role"
										defaultValue={company_role}
										label="Company role"
										error={form.getFieldState("company_role").error}
										type="select"
										placeholder={company_role}
										dataSelect={["CEO", "Director", "Manager", "Employee"]}
									/>
									<Field
										control={form.control}
										name="phone"
										defaultValue={phone}
										label="Phone number"
										error={form.getFieldState("phone").error}
										placeholder="Enter your phone"
									/>
								</div>
							</div>
							<div className="lg:border-right h-full w-full col-span-1 md:px-10 py-7 flex flex-col gap-2 max-lg:px-5">
								<Field
									control={form.control}
									name="city"
									defaultValue={cit}
									label="City / Province"
									error={form.getFieldState("city").error}
									type="select"
									placeholder={cit}
									dataSelect={[...province]}
									renderKey={"name"}
									onChangefunc={changeCity}
								/>
								<Field
									control={form.control}
									name="district"
									defaultValue={dist}
									label="District / Township"
									error={form.getFieldState("district").error}
									type="select"
									placeholder={dist}
									dataSelect={city}
									renderKey={"name"}
									onChangefunc={changeDistrict}
								/>
								<Field
									control={form.control}
									name="ward"
									defaultValue={ward}
									label="Ward / Commune / Town"
									error={form.getFieldState("ward").error}
									type="select"
									placeholder={ward}
									dataSelect={district}
									renderKey={"name"}
								/>
								<Field
									control={form.control}
									name="detail_address"
									defaultValue={detail_address}
									label="No ..."
									error={form.getFieldState("detail_address").error}
									placeholder="House number , street, road , ..."
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
		</>
	);
};

export default Profile;
