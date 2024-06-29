import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/toast";

const inter = Noto_Sans({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
	metadataBase: new URL("http://localhost:3000"),
	title: "GoobJob",
	description: "For all employers & candidates",
	// For link sharing to another socical (Facebook, LinkedIn, ...)
	openGraph: {
		locale: "vi_VN",
		type: "website",
		siteName: "GoodJob",
		images: [
			{
				url: "./logo.svg",
				width: 800,
				height: 600,
				alt: "GoobJob Recruitment website",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} overflow-x-hidden scroll-smooth`}>
				<ToastProvider>
					{children}
					<Toaster />
				</ToastProvider>
			</body>
		</html>
	);
}
