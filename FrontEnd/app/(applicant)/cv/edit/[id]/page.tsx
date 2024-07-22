"use client";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const page = (props: Props) => {
	const { id } = useParams();

	return <div>{id}</div>;
};

export default page;
