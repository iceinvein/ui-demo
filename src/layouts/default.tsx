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
			<footer className="mx-auto w-full max-w-6xl px-4 py-20">
				<div className="h-px bg-default-200/40" />
				<div className="mt-10 flex items-baseline justify-between">
					<div>
						<p className="font-['Instrument_Serif'] text-lg italic text-default-400">
							UI Showcase
						</p>
						<p className="mt-1 text-default-400/60 text-xs">
							Hand-crafted React components with Framer Motion
						</p>
					</div>
					<p className="text-default-400/60 text-xs tracking-widest uppercase">
						{new Date().getFullYear()}
					</p>
				</div>
			</footer>
		</div>
	);
}
