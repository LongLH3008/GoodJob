export const generateIOSTime = (time?: any) => {
	const date = time ? new Date(time) : new Date();
	return date.toISOString() as unknown as Date;
};

export const generateLocaleTime = (ISOString?: any) => {
	const date = new Date(ISOString);
	return date.toLocaleString("vi-VN") as unknown as Date;
};

export const isExpired = (time: any) => {
	const present = new Date().getTime();
	const input = new Date(time).getTime();
	return present > input ? false : true;
};
