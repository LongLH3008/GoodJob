"use client";
import React, { ReactNode, useEffect, useState } from "react";

const SkeletonProvider = ({
	skeleton,
	children,
	duration = 2000,
}: {
	skeleton: ReactNode;
	children: ReactNode;
	duration: number;
}) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, duration);
		return () => clearTimeout(timer);
	}, []);

	return <>{loading ? skeleton : children}</>;
};

export default SkeletonProvider;
