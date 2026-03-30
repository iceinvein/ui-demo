import { Button } from "@heroui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Crumb = {
	id: string;
	label: string;
};

// ---------------------------------------------------------------------------
// Full breadcrumb path definition
// ---------------------------------------------------------------------------

const FULL_PATH: Crumb[] = [
	{ id: "home", label: "Home" },
	{ id: "products", label: "Products" },
	{ id: "electronics", label: "Electronics" },
	{ id: "headphones", label: "Headphones" },
	{ id: "sony", label: "Sony WH-1000XM5" },
];

// ---------------------------------------------------------------------------
// Motion variants
// ---------------------------------------------------------------------------

const crumbVariants = {
	initial: { opacity: 0, x: 24, scale: 0.92 },
	animate: {
		opacity: 1,
		x: 0,
		scale: 1,
		transition: { type: "spring" as const, stiffness: 380, damping: 28 },
	},
	exit: {
		opacity: 0,
		x: 20,
		scale: 0.88,
		transition: { duration: 0.18, ease: "easeIn" as const },
	},
};

const chevronVariants = {
	initial: { opacity: 0, x: 12, scale: 0.7 },
	animate: (delay: number) => ({
		opacity: 1,
		x: 0,
		scale: 1,
		transition: {
			type: "spring" as const,
			stiffness: 400,
			damping: 30,
			delay,
		},
	}),
	exit: {
		opacity: 0,
		x: 10,
		scale: 0.7,
		transition: { duration: 0.14, ease: "easeIn" as const },
	},
};

// ---------------------------------------------------------------------------
// BreadcrumbTrail — primary animated trail
// ---------------------------------------------------------------------------

type BreadcrumbTrailProps = {
	crumbs: Crumb[];
	onNavigate: (index: number) => void;
};

function BreadcrumbTrail({ crumbs, onNavigate }: BreadcrumbTrailProps) {
	return (
		<nav aria-label="Breadcrumb" className="min-h-[40px]">
			<motion.ol layout className="flex flex-wrap items-center gap-y-2">
				<AnimatePresence mode="popLayout" initial={false}>
					{crumbs.map((crumb, index) => {
						const isLast = index === crumbs.length - 1;
						const isHome = index === 0;

						return (
							<motion.li
								key={crumb.id}
								layout
								variants={crumbVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								className="flex items-center"
							>
								{/* Chevron separator — shown before every crumb except the first */}
								{index > 0 && (
									<motion.span
										key={`sep-${crumb.id}`}
										variants={chevronVariants}
										initial="initial"
										animate="animate"
										exit="exit"
										custom={0.04}
										aria-hidden="true"
										className="mx-1.5 flex-shrink-0 text-default-400"
									>
										<ChevronRight className="h-3.5 w-3.5" />
									</motion.span>
								)}

								{/* Crumb label */}
								{isLast ? (
									<span
										aria-current="page"
										className="flex items-center gap-1.5 font-semibold text-default-900 text-sm"
									>
										{isHome && <Home className="h-3.5 w-3.5 flex-shrink-0" />}
										{crumb.label}
									</span>
								) : (
									<button
										type="button"
										onClick={() => onNavigate(index)}
										className="flex items-center gap-1.5 rounded text-default-500 text-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
									>
										{isHome && <Home className="h-3.5 w-3.5 flex-shrink-0" />}
										{crumb.label}
									</button>
								)}
							</motion.li>
						);
					})}
				</AnimatePresence>
			</motion.ol>
		</nav>
	);
}

// ---------------------------------------------------------------------------
// CollapsibleBreadcrumbTrail — collapses middle items beyond 4
// ---------------------------------------------------------------------------

type CollapsibleBreadcrumbTrailProps = {
	crumbs: Crumb[];
};

const COLLAPSE_THRESHOLD = 4;

function CollapsibleBreadcrumbTrail({
	crumbs,
}: CollapsibleBreadcrumbTrailProps) {
	const [expanded, setExpanded] = useState(false);

	const shouldCollapse = !expanded && crumbs.length > COLLAPSE_THRESHOLD;

	// Determine which crumbs to render
	const visibleCrumbs: Array<Crumb | "ellipsis"> = shouldCollapse
		? [
				crumbs[0],
				"ellipsis" as const,
				crumbs[crumbs.length - 2],
				crumbs[crumbs.length - 1],
			]
		: crumbs;

	return (
		<nav aria-label="Collapsible breadcrumb" className="min-h-[40px]">
			<motion.ol layout className="flex flex-wrap items-center gap-y-2">
				<AnimatePresence mode="popLayout" initial={false}>
					{visibleCrumbs.map((item, index) => {
						const isEllipsis = item === "ellipsis";
						const crumb = isEllipsis ? null : (item as Crumb);
						const isLast = index === visibleCrumbs.length - 1;
						const isHome = index === 0 && !isEllipsis;

						// Stable key for AnimatePresence
						const key = isEllipsis ? "ellipsis" : (crumb as Crumb).id;

						return (
							<motion.li
								key={key}
								layout
								variants={crumbVariants}
								initial="initial"
								animate="animate"
								exit="exit"
								className="flex items-center"
							>
								{index > 0 && (
									<motion.span
										key={`csep-${key}`}
										variants={chevronVariants}
										initial="initial"
										animate="animate"
										exit="exit"
										custom={0.04}
										aria-hidden="true"
										className="mx-1.5 flex-shrink-0 text-default-400"
									>
										<ChevronRight className="h-3.5 w-3.5" />
									</motion.span>
								)}

								{isEllipsis ? (
									<motion.button
										type="button"
										onClick={() => setExpanded(true)}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
										className="flex h-6 min-w-[28px] items-center justify-center rounded-md border border-default-300 bg-default-100 px-1.5 font-medium text-default-500 text-xs tracking-widest transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
										aria-label="Show hidden breadcrumb items"
									>
										&#8230;
									</motion.button>
								) : isLast ? (
									<span
										aria-current="page"
										className="flex items-center gap-1.5 font-semibold text-default-900 text-sm"
									>
										{isHome && <Home className="h-3.5 w-3.5 flex-shrink-0" />}
										{(crumb as Crumb).label}
									</span>
								) : (
									<span className="flex items-center gap-1.5 text-default-500 text-sm">
										{isHome && <Home className="h-3.5 w-3.5 flex-shrink-0" />}
										{(crumb as Crumb).label}
									</span>
								)}
							</motion.li>
						);
					})}
				</AnimatePresence>
			</motion.ol>
		</nav>
	);
}

// ---------------------------------------------------------------------------
// BreadcrumbDemo — top-level export
// ---------------------------------------------------------------------------

export function BreadcrumbDemo() {
	// Primary trail state: start at "Home"
	const [activeIndex, setActiveIndex] = useState(0);
	const currentCrumbs = FULL_PATH.slice(0, activeIndex + 1);

	const canGoDeeper = activeIndex < FULL_PATH.length - 1;
	const canGoBack = activeIndex > 0;

	const goDeeper = () => {
		if (canGoDeeper) setActiveIndex((i) => i + 1);
	};

	const goBack = () => {
		if (canGoBack) setActiveIndex((i) => i - 1);
	};

	const reset = () => setActiveIndex(0);

	const handleNavigate = (index: number) => {
		setActiveIndex(index);
	};

	// A counter used as React key to remount and reset the collapsible trail
	const [collapsibleKey, setCollapsibleKey] = useState(0);
	const resetCollapsible = () => setCollapsibleKey((n) => n + 1);

	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center p-8">
			<div className="w-full max-w-2xl space-y-10">
				{/* ---- Section 1: Primary animated breadcrumb ---- */}
				<section className="space-y-5">
					<div className="space-y-1">
						<h2 className="font-semibold text-base text-default-900">
							Animated Breadcrumb Trail
						</h2>
						<p className="text-default-500 text-xs">
							Items slide in from the right. Click a crumb to navigate back;
							items after it exit to the right.
						</p>
					</div>

					{/* Breadcrumb display area */}
					<div className="rounded-xl border border-default-200 bg-default-50 px-5 py-4">
						<BreadcrumbTrail
							crumbs={currentCrumbs}
							onNavigate={handleNavigate}
						/>
					</div>

					{/* Control buttons */}
					<div className="flex flex-wrap items-center gap-2">
						<Button
							size="sm"
							color="primary"
							variant="flat"
							isDisabled={!canGoDeeper}
							onPress={goDeeper}
						>
							Go deeper
						</Button>
						<Button
							size="sm"
							color="default"
							variant="flat"
							isDisabled={!canGoBack}
							onPress={goBack}
						>
							Go back
						</Button>
						<Button
							size="sm"
							color="danger"
							variant="flat"
							isDisabled={activeIndex === 0}
							onPress={reset}
						>
							Reset
						</Button>

						{/* Live path indicator */}
						<span className="ml-auto text-default-400 text-xs tabular-nums">
							{activeIndex + 1} / {FULL_PATH.length}
						</span>
					</div>

					{/* Current destination callout */}
					<AnimatePresence mode="wait">
						<motion.div
							key={FULL_PATH[activeIndex].id}
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -6 }}
							transition={{ duration: 0.2 }}
							className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5"
						>
							<p className="text-default-600 text-xs">
								<span className="font-medium text-primary">
									Currently viewing:
								</span>{" "}
								{FULL_PATH[activeIndex].label}
							</p>
						</motion.div>
					</AnimatePresence>
				</section>

				{/* Divider */}
				<div className="h-px bg-default-200" />

				{/* ---- Section 2: Collapsible breadcrumb ---- */}
				<section className="space-y-5">
					<div className="space-y-1">
						<h2 className="font-semibold text-base text-default-900">
							Collapsible Breadcrumb
						</h2>
						<p className="text-default-500 text-xs">
							When there are more than {COLLAPSE_THRESHOLD} crumbs, middle items
							collapse into&nbsp;
							<span className="font-mono text-default-700">...</span>&nbsp;—
							click it to expand all items.
						</p>
					</div>

					<div className="rounded-xl border border-default-200 bg-default-50 px-5 py-4">
						<CollapsibleBreadcrumbTrail
							key={collapsibleKey}
							crumbs={FULL_PATH}
						/>
					</div>

					<Button
						size="sm"
						color="default"
						variant="flat"
						onPress={resetCollapsible}
					>
						Reset collapsible
					</Button>
				</section>
			</div>
		</div>
	);
}
