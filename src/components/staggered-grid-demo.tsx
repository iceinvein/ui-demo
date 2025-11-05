import { motion } from "framer-motion";
import {
	ArrowDownAZ,
	ArrowUpAZ,
	Grid3x3,
	LayoutGrid,
	SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";
import { type GridItem, StaggeredGrid } from "./ui/staggered-grid";

type Category = "all" | "design" | "development" | "marketing" | "business";
type SortOption = "default" | "name-asc" | "name-desc";

interface ExtendedGridItem extends GridItem {
	title: string;
	description: string;
	category: Category;
	color: string;
	number: number;
}

export function StaggeredGridDemo() {
	const [category, setCategory] = useState<Category>("all");
	const [sortBy, setSortBy] = useState<SortOption>("default");
	const [isMasonry, setIsMasonry] = useState(false);

	const allItems: ExtendedGridItem[] = [
		{
			id: "1",
			title: "UI Design",
			description: "Beautiful interfaces that users love",
			category: "design",
			color: "purple",
			number: 1,
			content: <></>,
		},
		{
			id: "2",
			title: "React Development",
			description: "Build modern web applications with React",
			category: "development",
			color: "blue",
			number: 2,
			content: <></>,
		},
		{
			id: "3",
			title: "Brand Strategy",
			description:
				"Create compelling brand narratives that resonate with your audience and drive engagement",
			category: "marketing",
			color: "green",
			number: 3,
			content: <></>,
		},
		{
			id: "4",
			title: "TypeScript",
			description: "Type-safe development for scalable apps",
			category: "development",
			color: "orange",
			number: 4,
			content: <></>,
		},
		{
			id: "5",
			title: "Product Design",
			description:
				"End-to-end product design solutions from concept to launch with user-centered approach",
			category: "design",
			color: "indigo",
			number: 5,
			content: <></>,
		},
		{
			id: "6",
			title: "Business Analytics",
			description: "Data-driven insights for growth",
			category: "business",
			color: "pink",
			number: 6,
			content: <></>,
		},
		{
			id: "7",
			title: "SEO Optimization",
			description:
				"Improve your search rankings and visibility with proven SEO strategies",
			category: "marketing",
			color: "teal",
			number: 7,
			content: <></>,
		},
		{
			id: "8",
			title: "API Development",
			description:
				"Robust and scalable backend solutions with modern API architecture and best practices",
			category: "development",
			color: "amber",
			number: 8,
			content: <></>,
		},
		{
			id: "9",
			title: "Motion Design",
			description: "Engaging animations and micro-interactions",
			category: "design",
			color: "violet",
			number: 9,
			content: <></>,
		},
		{
			id: "10",
			title: "Content Marketing",
			description: "Strategic content that converts",
			category: "marketing",
			color: "rose",
			number: 10,
			content: <></>,
		},
		{
			id: "11",
			title: "Cloud Infrastructure",
			description:
				"Scalable cloud solutions for modern applications with high availability and performance",
			category: "development",
			color: "cyan",
			number: 11,
			content: <></>,
		},
		{
			id: "12",
			title: "Financial Planning",
			description:
				"Strategic financial management and forecasting for sustainable business growth",
			category: "business",
			color: "emerald",
			number: 12,
			content: <></>,
		},
	];

	// Filter and sort items, regenerating content based on layout mode
	const filteredAndSortedItems = useMemo(() => {
		// Generate card content function
		const generateCardContent = (
			item: ExtendedGridItem,
			forMasonry: boolean,
		) => {
			const colorMap: Record<
				string,
				{ bg: string; border: string; numberBg: string; numberText: string }
			> = {
				purple: {
					bg: "bg-purple-950/40",
					border: "border-purple-800/30",
					numberBg: "bg-purple-600/30",
					numberText: "text-purple-400",
				},
				blue: {
					bg: "bg-blue-950/40",
					border: "border-blue-800/30",
					numberBg: "bg-blue-600/30",
					numberText: "text-blue-400",
				},
				green: {
					bg: "bg-green-950/40",
					border: "border-green-800/30",
					numberBg: "bg-green-600/30",
					numberText: "text-green-400",
				},
				orange: {
					bg: "bg-orange-950/40",
					border: "border-orange-800/30",
					numberBg: "bg-orange-600/30",
					numberText: "text-orange-400",
				},
				indigo: {
					bg: "bg-indigo-950/40",
					border: "border-indigo-800/30",
					numberBg: "bg-indigo-600/30",
					numberText: "text-indigo-400",
				},
				pink: {
					bg: "bg-pink-950/40",
					border: "border-pink-800/30",
					numberBg: "bg-pink-600/30",
					numberText: "text-pink-400",
				},
				teal: {
					bg: "bg-teal-950/40",
					border: "border-teal-800/30",
					numberBg: "bg-teal-600/30",
					numberText: "text-teal-400",
				},
				amber: {
					bg: "bg-amber-950/40",
					border: "border-amber-800/30",
					numberBg: "bg-amber-600/30",
					numberText: "text-amber-400",
				},
				violet: {
					bg: "bg-violet-950/40",
					border: "border-violet-800/30",
					numberBg: "bg-violet-600/30",
					numberText: "text-violet-400",
				},
				rose: {
					bg: "bg-rose-950/40",
					border: "border-rose-800/30",
					numberBg: "bg-rose-600/30",
					numberText: "text-rose-400",
				},
				cyan: {
					bg: "bg-cyan-950/40",
					border: "border-cyan-800/30",
					numberBg: "bg-cyan-600/30",
					numberText: "text-cyan-400",
				},
				emerald: {
					bg: "bg-emerald-950/40",
					border: "border-emerald-800/30",
					numberBg: "bg-emerald-600/30",
					numberText: "text-emerald-400",
				},
			};

			const colors = colorMap[item.color];

			// Vary heights based on description length for masonry, equal height for grid
			const heightClass = forMasonry
				? item.description.length > 80
					? "min-h-[280px]"
					: item.description.length > 50
						? "min-h-[240px]"
						: "min-h-[200px]"
				: "h-full";

			// Category badge styling
			const categoryColors: Record<Category, string> = {
				all: "bg-default-500/20 text-default-400 border-default-500/30",
				design: "bg-purple-500/20 text-purple-400 border-purple-500/30",
				development: "bg-blue-500/20 text-blue-400 border-blue-500/30",
				marketing: "bg-green-500/20 text-green-400 border-green-500/30",
				business: "bg-orange-500/20 text-orange-400 border-orange-500/30",
			};

			return (
				<div
					className={`flex flex-col rounded-xl border ${colors.border} ${colors.bg} p-8 backdrop-blur-sm ${heightClass}`}
				>
					{/* Category Badge */}
					<div className="mb-4 flex justify-center">
						<span
							className={`rounded-full border px-3 py-1 font-medium text-xs uppercase tracking-wide ${categoryColors[item.category]}`}
						>
							{item.category}
						</span>
					</div>

					{/* Number Badge */}
					<div className="mb-4 flex justify-center">
						<div
							className={`flex h-16 w-16 items-center justify-center rounded-full ${colors.numberBg} backdrop-blur-sm`}
						>
							<span className={`font-bold text-3xl ${colors.numberText}`}>
								{item.number}
							</span>
						</div>
					</div>

					{/* Content */}
					<div className="flex flex-1 flex-col items-center justify-center text-center">
						<h3 className="mb-3 font-bold text-white text-xl">{item.title}</h3>
						<p className="text-default-400 text-sm leading-relaxed">
							{item.description}
						</p>
					</div>
				</div>
			);
		};

		let result = [...allItems];

		// Filter by category
		if (category !== "all") {
			result = result.filter((item) => item.category === category);
		}

		// Sort
		if (sortBy === "name-asc") {
			result.sort((a, b) => a.title.localeCompare(b.title));
		} else if (sortBy === "name-desc") {
			result.sort((a, b) => b.title.localeCompare(a.title));
		}

		// Regenerate content based on layout mode
		return result.map((item) => ({
			...item,
			content: generateCardContent(item, isMasonry),
		}));
	}, [category, sortBy, isMasonry]);

	const categories: { value: Category; label: string; count: number }[] = [
		{ value: "all", label: "All", count: allItems.length },
		{
			value: "design",
			label: "Design",
			count: allItems.filter((i) => i.category === "design").length,
		},
		{
			value: "development",
			label: "Development",
			count: allItems.filter((i) => i.category === "development").length,
		},
		{
			value: "marketing",
			label: "Marketing",
			count: allItems.filter((i) => i.category === "marketing").length,
		},
		{
			value: "business",
			label: "Business",
			count: allItems.filter((i) => i.category === "business").length,
		},
	];

	return (
		<div className="p-8">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 text-center">
					<h2 className="mb-2 font-bold text-3xl">Our Services</h2>
					<p className="text-default-600">Discover what makes us different</p>
				</div>

				{/* Controls */}
				<div className="mb-8 flex flex-wrap items-center justify-between gap-4">
					{/* Category Filter */}
					<div className="flex flex-wrap gap-3">
						{categories.map((cat) => (
							<motion.button
								key={cat.value}
								onClick={() => setCategory(cat.value)}
								className={`rounded-lg px-5 py-2.5 font-medium text-sm transition-all ${
									category === cat.value
										? "bg-primary text-white shadow-lg shadow-primary/25"
										: "border border-default-300 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:bg-background"
								}`}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								{cat.label} ({cat.count})
							</motion.button>
						))}
					</div>

					{/* Sort and Layout Controls */}
					<div className="flex gap-3">
						{/* Sort Button */}
						<motion.button
							onClick={() => {
								if (sortBy === "default") setSortBy("name-asc");
								else if (sortBy === "name-asc") setSortBy("name-desc");
								else setSortBy("default");
							}}
							className="flex items-center gap-2 rounded-lg border border-default-300 bg-background/50 px-5 py-2.5 font-medium text-sm backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-background"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{sortBy === "name-asc" && <ArrowDownAZ className="h-4 w-4" />}
							{sortBy === "name-desc" && <ArrowUpAZ className="h-4 w-4" />}
							{sortBy === "default" && (
								<SlidersHorizontal className="h-4 w-4" />
							)}
							Sort
						</motion.button>

						{/* Layout Toggle */}
						<motion.button
							onClick={() => setIsMasonry(!isMasonry)}
							className="flex items-center gap-2 rounded-lg border border-default-300 bg-background/50 px-5 py-2.5 font-medium text-sm backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-background"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{isMasonry ? (
								<LayoutGrid className="h-4 w-4" />
							) : (
								<Grid3x3 className="h-4 w-4" />
							)}
							{isMasonry ? "Masonry" : "Grid"}
						</motion.button>
					</div>
				</div>

				{/* Grid */}
				<StaggeredGrid
					items={filteredAndSortedItems}
					columns={3}
					gap={6}
					staggerDelay={0.05}
					animationDuration={0.4}
					masonry={isMasonry}
				/>
			</div>
		</div>
	);
}
