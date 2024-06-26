"use client";
import { Button } from "@/components/ui/button";
import { instance } from "@/lib/api/api";
import { UserState } from "@/lib/hooks/user";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const page = (props: Props) => {
	// const { user_role } = UserState();
	// const router = useRouter();
	// if (user_role !== "Employer") {
	// 	router.replace("/");
	// }
	const get = async () => {
		console.log("run");
		try {
			const data = await instance.get("/user");
			console.log(data);
		} catch (error) {
			console.log(error);
		}
		console.log("fishish");
	};

	const click = () => {
		get();
	};

	return (
		<>
			<div>
				<Button onClick={() => click()}>GET</Button>
			</div>
		</>
	);
};

export default page;
