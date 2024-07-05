"use client";
import { SwrFetcher } from "@/lib/hooks/swr";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

type Props = {};

const DetailCompanyPage = (props: Props) => {
	const { id } = useParams();

	const { data } = useSWR(`/company/${id}`, SwrFetcher);

	return <div>DetailCompanyPage</div>;
};

export default DetailCompanyPage;
