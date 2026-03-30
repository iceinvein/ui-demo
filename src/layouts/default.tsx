import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex min-h-screen flex-col">
			<Navbar />
			<main className="flex-grow pt-16">{children}</main>
			<footer className="mx-auto w-full max-w-6xl px-4 py-16">
				<div className="h-px bg-default-200/40" />
				<div className="mt-8 flex items-baseline justify-between">
					<p className="text-default-400 text-xs">
						UI Showcase
					</p>
					<p className="text-default-400 text-xs">
						{new Date().getFullYear()}
					</p>
				</div>
			</footer>
		</div>
	);
}
