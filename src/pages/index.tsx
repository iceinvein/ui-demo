import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useMatch } from "react-router-dom";
import { AnimatedComponentDialog } from "@/components/animated-component-dialog";
import { DirectOpenDialog } from "@/components/direct-open-dialog";
import { categories, components } from "@/data/components";
import DefaultLayout from "@/layouts/default";

const categoryStyle: Record<
	string,
	{ accent: string; bg: string; line: string }
> = {
	animation: {
		accent: "#c96b4f",
		bg: "bg-[#c96b4f]/[0.04]",
		line: "bg-[#c96b4f]/20",
	},
	"data-display": {
		accent: "#5f9a7e",
		bg: "bg-[#5f9a7e]/[0.04]",
		line: "bg-[#5f9a7e]/20",
	},
	navigation: {
		accent: "#7c8a9e",
		bg: "bg-[#7c8a9e]/[0.04]",
		line: "bg-[#7c8a9e]/20",
	},
	feedback: {
		accent: "#c9a44e",
		bg: "bg-[#c9a44e]/[0.04]",
		line: "bg-[#c9a44e]/20",
	},
};

const categoryLayout: Record<
	string,
	{
		grid: string;
		featureFirst: boolean;
		headerGap: string;
		sectionGap: string;
	}
> = {
	animation: {
		grid: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
		featureFirst: true,
		headerGap: "mb-8",
		sectionGap: "mb-28 md:mb-36",
	},
	"data-display": {
		grid: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
		featureFirst: true,
		headerGap: "mb-8",
		sectionGap: "mb-24 md:mb-32",
	},
	navigation: {
		grid: "grid grid-cols-1 gap-5 md:grid-cols-2",
		featureFirst: false,
		headerGap: "mb-10",
		sectionGap: "mb-28 md:mb-36",
	},
	feedback: {
		grid: "grid grid-cols-1 gap-5 md:grid-cols-2",
		featureFirst: false,
		headerGap: "mb-10",
		sectionGap: "mb-20",
	},
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

			<section className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-24">
				{/* Hero */}
				<motion.div
					className="mb-16 md:mb-20"
					initial={prefersReducedMotion ? false : { opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
				>
					<h1 className="mb-6 font-['Instrument_Serif'] text-[clamp(4.5rem,3rem+7.5vw,9rem)] text-default-900 leading-[0.92] tracking-tight">
						UI
						<br />
						<em>Showcase</em>
					</h1>
					<div className="flex items-center gap-4">
						<div className="h-px w-12 bg-[#c96b4f]/35" />
						<p className="text-base text-default-500 tracking-wide">
							{components.length} animated React components, built by hand.
						</p>
					</div>
				</motion.div>

				{/* Filter Bar — shadow appears when stuck via [:stuck] pseudo-class workaround */}
				<motion.div
					className="-mx-4 sticky top-16 z-40 mb-16 border-default-200/40 border-b bg-background/80 px-4 py-4 shadow-[0_0_0_0_transparent] backdrop-blur-xl transition-shadow md:mb-20 [&:not(:hover)]:supports-[position:sticky]:shadow-sm"
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
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search components..."
								className="w-full rounded-lg border border-default-200/60 bg-default-50 py-2.5 pr-3 pl-9 text-default-900 text-sm transition-colors placeholder:text-default-400 focus:border-default-400 focus:outline-none"
							/>
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
										: "bg-default-100 text-default-600 hover:bg-default-200"
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
									const style = categoryStyle[cat.id];
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
											className="rounded-full px-4 py-1.5 font-medium text-xs tracking-wide transition-all"
											style={
												isActive
													? {
															backgroundColor: style?.accent,
															color: "#fff",
														}
													: {
															backgroundColor: `color-mix(in oklch, ${style?.accent || "#888"} 10%, transparent)`,
															color: style?.accent,
														}
											}
										>
											{cat.name}
											<span className="ml-1.5 opacity-60">{count}</span>
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
							className="mt-4 text-[#c96b4f] text-sm underline underline-offset-4 hover:text-[#b5583f]"
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
							const style = categoryStyle[category.id];
							const layout = categoryLayout[category.id];

							return (
								<motion.div
									key={category.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4 }}
									className={layout?.sectionGap || "mb-20"}
									id={`category-${category.id}`}
								>
									{/* Category Header */}
									<div
										className={`flex items-baseline gap-4 ${layout?.headerGap || "mb-8"}`}
									>
										<div
											className="h-2.5 w-2.5 translate-y-[-1px] rounded-full"
											style={{
												backgroundColor: style?.accent || "#888",
											}}
										/>
										<h2 className="font-['Instrument_Serif'] text-2xl text-default-900 italic leading-tight">
											{category.name}
										</h2>
										<div
											className={`h-px flex-1 ${style?.line || "bg-default-200"}`}
										/>
										<span className="text-default-400 text-xs">
											{String(category.items.length).padStart(2, "0")}
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
										className={
											layout?.grid ||
											"grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
										}
									>
										{category.items.map((component, idx) => (
											<motion.div
												key={component.id}
												variants={cardItem(!!prefersReducedMotion)}
												className={
													layout?.featureFirst && idx === 0
														? "sm:col-span-2"
														: ""
												}
											>
												<AnimatedComponentDialog
													component={component}
													featured={layout?.featureFirst && idx === 0}
													accentColor={style?.accent}
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
