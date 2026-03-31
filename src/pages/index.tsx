import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMatch } from "react-router-dom";
import { AnimatedComponentDialog } from "@/components/animated-component-dialog";
import { DirectOpenDialog } from "@/components/direct-open-dialog";
import { categories, components } from "@/data/components";
import DefaultLayout from "@/layouts/default";

const categoryAccent: Record<string, string> = {
	animation: "#c96b4f",
	"data-display": "#5f9a7e",
	navigation: "#7c8a9e",
	feedback: "#c9a44e",
};

const staggerContainer = (reduced: boolean) => ({
	hidden: {},
	visible: {
		transition: { staggerChildren: reduced ? 0 : 0.06 },
	},
});

const cardItem = (reduced: boolean) => ({
	hidden: reduced ? {} : { opacity: 0, y: 16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: reduced
			? { duration: 0 }
			: {
					duration: 0.4,
					ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
				},
	},
});

export default function IndexPage() {
	const componentMatch = useMatch("/component/:componentId");
	const componentId = componentMatch?.params.componentId;
	const [search, setSearch] = useState("");
	const [activeCategory, setActiveCategory] = useState<string | null>(null);
	const [clickedCardId, setClickedCardId] = useState<string | null>(null);
	const prefersReducedMotion = useReducedMotion();
	const searchRef = useRef<HTMLInputElement>(null);

	// ⌘K / Ctrl+K to focus search
	const handleGlobalKey = useCallback((e: KeyboardEvent) => {
		if ((e.metaKey || e.ctrlKey) && e.key === "k") {
			e.preventDefault();
			searchRef.current?.focus();
		}
	}, []);
	useEffect(() => {
		document.addEventListener("keydown", handleGlobalKey);
		return () => document.removeEventListener("keydown", handleGlobalKey);
	}, [handleGlobalKey]);

	// Reset card click tracking when navigating away from a component
	useEffect(() => {
		if (!componentId) setClickedCardId(null);
	}, [componentId]);

	// Only show DirectOpenDialog for direct URL access (no card morph source)
	const directOpenComponent =
		componentId && clickedCardId !== componentId
			? components.find((c) => c.id === componentId)
			: null;

	const filtered = useMemo(() => {
		return components.filter((c) => {
			if (activeCategory && c.category !== activeCategory) return false;
			if (search) {
				const q = search.toLowerCase();
				return (
					c.title.toLowerCase().includes(q) ||
					c.description.toLowerCase().includes(q) ||
					c.tags?.some((t) => t.toLowerCase().includes(q))
				);
			}
			return true;
		});
	}, [search, activeCategory]);

	const grouped = useMemo(() => {
		return [...categories]
			.map((cat) => ({
				...cat,
				items: filtered.filter((c) => c.category === cat.id),
			}))
			.filter((cat) => cat.items.length > 0)
			.sort((a, b) => b.items.length - a.items.length);
	}, [filtered]);

	return (
		<DefaultLayout>
			{directOpenComponent && (
				<DirectOpenDialog component={directOpenComponent} />
			)}

			<section className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-20">
				{/* Hero */}
				<motion.div
					className="mb-10 md:mb-14"
					initial={prefersReducedMotion ? false : { opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
				>
					<h1 className="font-['Instrument_Serif'] text-[clamp(2.5rem,2rem+3vw,4.5rem)] text-default-900 leading-[1] tracking-tight">
						UI Showcase
					</h1>
					<p className="mt-3 text-default-400 text-sm">
						A collection of {components.length} interactive components built with
						React & Framer Motion
					</p>
				</motion.div>

				{/* Filter Bar */}
				<motion.div
					className="-mx-4 sticky top-16 z-40 mb-12 border-default-200/30 border-b bg-background/90 px-4 py-3 backdrop-blur-xl md:mb-16"
					initial={{ opacity: 0, y: -8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, delay: 0.2 }}
				>
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						{/* Search */}
						<div className="relative max-w-xs flex-1">
							<svg
								className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-default-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
							<input
								ref={searchRef}
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search components..."
								className="w-full rounded-lg border border-default-200/60 bg-default-50 py-2.5 pr-10 pl-9 text-default-900 text-sm transition-colors placeholder:text-default-400 focus:border-default-400 focus:outline-none"
							/>
							{!search && (
								<kbd className="-translate-y-1/2 absolute top-1/2 right-3 hidden rounded border border-default-200/60 bg-default-100 px-1.5 py-0.5 font-mono text-[10px] text-default-400 sm:inline-block">
									⌘K
								</kbd>
							)}
							{search && (
								<button
									type="button"
									onClick={() => setSearch("")}
									className="-translate-y-1/2 absolute top-1/2 right-3 text-default-400 hover:text-default-600"
								>
									<svg
										className="h-3.5 w-3.5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							)}
						</div>

						{/* Category Pills */}
						<div className="flex flex-wrap gap-2">
							<button
								type="button"
								onClick={() => setActiveCategory(null)}
								className={`rounded-full px-4 py-1.5 font-medium text-xs tracking-wide transition-all ${
									activeCategory === null
										? "bg-default-900 text-default-50"
										: "bg-default-100 text-default-500 hover:bg-default-200 hover:text-default-700"
								}`}
							>
								All
								<span className="ml-1.5 opacity-60">{components.length}</span>
							</button>
							{[...categories]
								.sort((a, b) => {
									const aCount = components.filter(
										(c) => c.category === a.id,
									).length;
									const bCount = components.filter(
										(c) => c.category === b.id,
									).length;
									return bCount - aCount;
								})
								.map((cat) => {
									const count = components.filter(
										(c) => c.category === cat.id,
									).length;
									const isActive = activeCategory === cat.id;
									return (
										<button
											key={cat.id}
											type="button"
											onClick={() =>
												setActiveCategory(isActive ? null : cat.id)
											}
											className={`rounded-full px-4 py-1.5 font-medium text-xs tracking-wide transition-all ${
												isActive
													? "bg-default-900 text-default-50"
													: "bg-default-100 text-default-500 hover:bg-default-200 hover:text-default-700"
											}`}
										>
											{cat.name}
											<span className="ml-1.5 opacity-50">{count}</span>
										</button>
									);
								})}
						</div>
					</div>
				</motion.div>

				{/* Empty state */}
				{filtered.length === 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="py-20 text-center"
					>
						<p className="font-['Instrument_Serif'] text-2xl text-default-400 italic">
							No components found
						</p>
						<p className="mt-2 text-default-400 text-sm">
							Try a different search term or category
						</p>
						<button
							type="button"
							onClick={() => {
								setSearch("");
								setActiveCategory(null);
							}}
							className="mt-4 text-default-500 text-sm underline underline-offset-4 hover:text-default-700"
						>
							Clear filters
						</button>
					</motion.div>
				)}

				{/* Categories */}
				<AnimatePresence mode="wait">
					<motion.div
						key={`${activeCategory || "all"}-${search}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						{grouped.map((category) => {
							const accent = categoryAccent[category.id] || "#888";

							return (
								<motion.div
									key={category.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4 }}
									className="mb-20 md:mb-28"
									id={`category-${category.id}`}
								>
									{/* Category Header */}
									<div className="mb-8 flex items-baseline justify-between border-default-200/60 border-b pb-3">
										<h2 className="font-medium text-default-900 text-sm uppercase tracking-widest">
											{category.name}
										</h2>
										<span className="text-default-400 text-xs tabular-nums">
											{category.items.length}
										</span>
									</div>

									{/* Component Grid */}
									<motion.div
										variants={staggerContainer(!!prefersReducedMotion)}
										initial="hidden"
										whileInView="visible"
										viewport={{
											once: true,
											margin: "-40px",
										}}
										className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
									>
										{category.items.map((component) => (
											<motion.div
												key={component.id}
												variants={cardItem(!!prefersReducedMotion)}
											>
												<AnimatedComponentDialog
													component={component}
													accentColor={accent}
													currentComponentId={componentId}
													onCardClick={setClickedCardId}
												/>
											</motion.div>
										))}
									</motion.div>
								</motion.div>
							);
						})}
					</motion.div>
				</AnimatePresence>
			</section>
		</DefaultLayout>
	);
}
