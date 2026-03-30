import { Button } from "@heroui/button";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const TOTAL_PAGES = 10;

// Per-page accent palette — cycles through distinct hues
const PAGE_ACCENTS: {
	bg: string;
	border: string;
	text: string;
	dot: string;
}[] = [
	{
		bg: "from-violet-500/20 to-purple-500/10",
		border: "border-violet-500/30",
		text: "text-violet-400",
		dot: "bg-violet-500",
	},
	{
		bg: "from-blue-500/20 to-cyan-500/10",
		border: "border-blue-500/30",
		text: "text-blue-400",
		dot: "bg-blue-500",
	},
	{
		bg: "from-emerald-500/20 to-teal-500/10",
		border: "border-emerald-500/30",
		text: "text-emerald-400",
		dot: "bg-emerald-500",
	},
	{
		bg: "from-amber-500/20 to-yellow-500/10",
		border: "border-amber-500/30",
		text: "text-amber-400",
		dot: "bg-amber-500",
	},
	{
		bg: "from-rose-500/20 to-pink-500/10",
		border: "border-rose-500/30",
		text: "text-rose-400",
		dot: "bg-rose-500",
	},
	{
		bg: "from-indigo-500/20 to-blue-500/10",
		border: "border-indigo-500/30",
		text: "text-indigo-400",
		dot: "bg-indigo-500",
	},
	{
		bg: "from-fuchsia-500/20 to-purple-500/10",
		border: "border-fuchsia-500/30",
		text: "text-fuchsia-400",
		dot: "bg-fuchsia-500",
	},
	{
		bg: "from-cyan-500/20 to-sky-500/10",
		border: "border-cyan-500/30",
		text: "text-cyan-400",
		dot: "bg-cyan-500",
	},
	{
		bg: "from-orange-500/20 to-amber-500/10",
		border: "border-orange-500/30",
		text: "text-orange-400",
		dot: "bg-orange-500",
	},
	{
		bg: "from-lime-500/20 to-green-500/10",
		border: "border-lime-500/30",
		text: "text-lime-400",
		dot: "bg-lime-500",
	},
];

// Placeholder paragraph excerpts for each page
const PAGE_EXCERPTS = [
	"Exploring the foundations of modern UI design — where simplicity meets interaction and every pixel carries intent.",
	"Animation brings interfaces to life. Subtle motion cues guide attention and communicate state without a single word.",
	"Component composition is the heart of scalable React architecture. Build small, reuse everywhere, test confidently.",
	"Performance starts at the design phase. Lazy loading, code splitting, and memoization are your closest allies.",
	"Accessibility is not an afterthought — keyboard navigation, ARIA roles, and contrast ratios matter from day one.",
	"State management patterns evolve: local state, context, external stores, server state — each has its place.",
	"Design tokens create the bridge between design and code. Consistent colours, spacing, and typography at scale.",
	"Testing gives you confidence to refactor. Unit tests, integration tests, and E2E tests form a safety net.",
	"Type safety with TypeScript narrows the gap between intent and implementation — fewer runtime surprises.",
	"Shipping is a feature. CI/CD pipelines, preview deployments, and observability complete the development loop.",
];

// ─── Page content card ────────────────────────────────────────────────────────

type PageCardProps = {
	page: number;
	direction: 1 | -1;
};

function PageCard({ page, direction }: PageCardProps) {
	const accent = PAGE_ACCENTS[(page - 1) % PAGE_ACCENTS.length];

	return (
		<motion.div
			key={page}
			custom={direction}
			variants={{
				enter: (dir: number) => ({
					x: dir > 0 ? 80 : -80,
					opacity: 0,
				}),
				center: {
					x: 0,
					opacity: 1,
				},
				exit: (dir: number) => ({
					x: dir > 0 ? -80 : 80,
					opacity: 0,
				}),
			}}
			initial="enter"
			animate="center"
			exit="exit"
			transition={{ type: "spring", stiffness: 350, damping: 32 }}
			className={`w-full rounded-2xl border bg-gradient-to-br p-6 ${accent.bg} ${accent.border}`}
		>
			{/* Card header */}
			<div className="mb-4 flex items-center gap-3">
				<motion.div
					layoutId="page-card-icon"
					className={`flex h-9 w-9 items-center justify-center rounded-xl ${accent.dot} text-white`}
					transition={{ type: "spring", stiffness: 400, damping: 30 }}
				>
					<span className="font-bold text-sm">{page}</span>
				</motion.div>
				<div>
					<p className={`font-semibold text-sm ${accent.text}`}>
						Page {page} of {TOTAL_PAGES}
					</p>
					<p className="text-default-500 text-xs">Article excerpt</p>
				</div>
			</div>

			{/* Body text */}
			<p className="text-default-600 text-sm leading-relaxed">
				{PAGE_EXCERPTS[page - 1]}
			</p>

			{/* Skeleton lines */}
			<div className="mt-4 space-y-2">
				{[
					{ w: 80, id: "a" },
					{ w: 65, id: "b" },
					{ w: 90, id: "c" },
				].map(({ w, id }) => (
					<div
						key={id}
						className={`h-2 rounded-full bg-current opacity-10 ${accent.text}`}
						style={{ width: `${w}%` }}
					/>
				))}
			</div>
		</motion.div>
	);
}

// ─── Dot pagination ───────────────────────────────────────────────────────────

type DotPaginationProps = {
	page: number;
	total: number;
	onSelect: (p: number) => void;
};

function DotPagination({ page, total, onSelect }: DotPaginationProps) {
	const accent = PAGE_ACCENTS[(page - 1) % PAGE_ACCENTS.length];
	return (
		<div className="flex items-center gap-2">
			{Array.from({ length: total }, (_, i) => {
				const p = i + 1;
				const isActive = p === page;
				return (
					<button
						key={p}
						type="button"
						aria-label={`Go to page ${p}`}
						onClick={() => onSelect(p)}
						className="relative flex items-center justify-center focus:outline-none"
					>
						<motion.span
							animate={{
								width: isActive ? 20 : 8,
								height: isActive ? 8 : 8,
								opacity: isActive ? 1 : 0.3,
							}}
							transition={{ type: "spring", stiffness: 400, damping: 30 }}
							className={`block rounded-full ${isActive ? accent.dot : "bg-default-400"}`}
							style={{ display: "block" }}
						/>
					</button>
				);
			})}
		</div>
	);
}

// ─── Animated page number ─────────────────────────────────────────────────────

type AnimatedPageNumberProps = {
	page: number;
	direction: 1 | -1;
};

function AnimatedPageNumber({ page, direction }: AnimatedPageNumberProps) {
	return (
		<div className="relative inline-flex h-6 w-5 items-center justify-center overflow-hidden">
			<AnimatePresence mode="wait" custom={direction}>
				<motion.span
					key={page}
					custom={direction}
					variants={{
						enter: (dir: number) => ({
							y: dir > 0 ? 14 : -14,
							opacity: 0,
						}),
						center: { y: 0, opacity: 1 },
						exit: (dir: number) => ({
							y: dir > 0 ? -14 : 14,
							opacity: 0,
						}),
					}}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{ duration: 0.18, ease: "easeInOut" }}
					className="absolute font-semibold text-default-700 text-sm tabular-nums"
				>
					{page}
				</motion.span>
			</AnimatePresence>
		</div>
	);
}

// ─── Main pagination bar ──────────────────────────────────────────────────────

type PaginationBarProps = {
	page: number;
	total: number;
	onSelect: (p: number, dir: 1 | -1) => void;
};

function PaginationBar({ page, total, onSelect }: PaginationBarProps) {
	return (
		<LayoutGroup>
			<div className="flex items-center gap-1 rounded-2xl border border-default-200/60 bg-default-100/50 p-1 backdrop-blur-sm">
				{Array.from({ length: total }, (_, i) => {
					const p = i + 1;
					const isActive = p === page;
					return (
						<button
							key={p}
							type="button"
							aria-label={`Page ${p}`}
							aria-current={isActive ? "page" : undefined}
							onClick={() => onSelect(p, p > page ? 1 : -1)}
							className="relative z-10 flex h-8 min-w-[2rem] items-center justify-center rounded-xl px-1 focus:outline-none"
						>
							{/* Sliding active background */}
							{isActive && (
								<motion.span
									layoutId="pagination-active-bg"
									className="absolute inset-0 rounded-xl bg-default-50 shadow-sm ring-1 ring-default-200/80"
									transition={{
										type: "spring",
										stiffness: 400,
										damping: 30,
									}}
								/>
							)}
							{/* Page number with subtle scale on active */}
							<motion.span
								animate={{
									scale: isActive ? 1.1 : 1,
									color: isActive ? "var(--heroui-foreground)" : undefined,
								}}
								transition={{ type: "spring", stiffness: 400, damping: 25 }}
								className={`relative z-10 font-medium text-sm tabular-nums ${
									isActive ? "text-default-900" : "text-default-400"
								}`}
							>
								{p}
							</motion.span>
						</button>
					);
				})}
			</div>
		</LayoutGroup>
	);
}

// ─── Root demo component ──────────────────────────────────────────────────────

export function PaginationDemo() {
	const [page, setPage] = useState(1);
	const [direction, setDirection] = useState<1 | -1>(1);

	const navigate = (target: number, dir?: 1 | -1) => {
		const clampedTarget = Math.max(1, Math.min(TOTAL_PAGES, target));
		const resolvedDir = dir ?? (clampedTarget > page ? 1 : -1);
		if (clampedTarget === page) return;
		setDirection(resolvedDir);
		setPage(clampedTarget);
	};

	const canPrev = page > 1;
	const canNext = page < TOTAL_PAGES;

	return (
		<div className="flex min-h-[500px] items-center justify-center p-8">
			<div className="flex w-full max-w-xl flex-col gap-8">
				{/* Section header */}
				<div className="text-center">
					<h2 className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text font-bold text-2xl text-transparent">
						Animated Pagination
					</h2>
					<p className="mt-1 text-default-500 text-sm">
						Spring-driven page transitions with sliding indicator
					</p>
				</div>

				{/* ── Main pagination controls ── */}
				<div className="flex flex-col items-center gap-4">
					{/* Pagination bar */}
					<PaginationBar
						page={page}
						total={TOTAL_PAGES}
						onSelect={(p, dir) => navigate(p, dir)}
					/>

					{/* Prev / Next + page counter */}
					<div className="flex items-center gap-3">
						<Button
							isIconOnly
							variant="bordered"
							size="sm"
							isDisabled={!canPrev}
							onPress={() => navigate(page - 1, -1)}
							aria-label="Previous page"
							className="rounded-xl border-default-200 bg-default-50 text-default-600 disabled:opacity-40"
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>

						{/* "Page X of 10" */}
						<div className="flex items-center gap-1 text-default-500 text-sm">
							<span>Page</span>
							<AnimatedPageNumber page={page} direction={direction} />
							<span>of {TOTAL_PAGES}</span>
						</div>

						<Button
							isIconOnly
							variant="bordered"
							size="sm"
							isDisabled={!canNext}
							onPress={() => navigate(page + 1, 1)}
							aria-label="Next page"
							className="rounded-xl border-default-200 bg-default-50 text-default-600 disabled:opacity-40"
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{/* ── Animated page content card ── */}
				<div className="relative overflow-hidden">
					<AnimatePresence mode="wait" custom={direction}>
						<PageCard key={page} page={page} direction={direction} />
					</AnimatePresence>
				</div>

				{/* ── Dot indicator ── */}
				<div className="flex flex-col items-center gap-2">
					<p className="text-default-400 text-xs uppercase tracking-widest">
						Compact indicator
					</p>
					<DotPagination
						page={page}
						total={TOTAL_PAGES}
						onSelect={(p) => navigate(p)}
					/>
				</div>
			</div>
		</div>
	);
}
