import { Button } from "@heroui/button";
import { AnimatePresence, type Variants, motion } from "framer-motion";
import { Info, Layers, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TooltipPosition = "top" | "bottom" | "left" | "right";

type TooltipConfig = {
	id: string;
	position: TooltipPosition;
	label: string;
	tooltip: string;
	color: string;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SPRING = { type: "spring" as const, stiffness: 500, damping: 28 };

/**
 * Per-position variants.
 * hidden = initial/exit state (offset toward the trigger).
 * visible = resting state (natural position).
 */
const VARIANTS: Record<TooltipPosition, Variants> = {
	top: {
		hidden: { opacity: 0, scale: 0.85, y: 6 },
		visible: { opacity: 1, scale: 1, y: 0 },
	},
	bottom: {
		hidden: { opacity: 0, scale: 0.85, y: -6 },
		visible: { opacity: 1, scale: 1, y: 0 },
	},
	left: {
		hidden: { opacity: 0, scale: 0.85, x: 6 },
		visible: { opacity: 1, scale: 1, x: 0 },
	},
	right: {
		hidden: { opacity: 0, scale: 0.85, x: -6 },
		visible: { opacity: 1, scale: 1, x: 0 },
	},
};

/** Absolute positioning classes for the tooltip bubble relative to the trigger */
const TOOLTIP_POSITION_CLASSES: Record<TooltipPosition, string> = {
	top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
	bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
	left: "right-full top-1/2 -translate-y-1/2 mr-2",
	right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

/** Arrow classes — a rotated square whose visible half forms the triangle */
const ARROW_POSITION_CLASSES: Record<TooltipPosition, string> = {
	top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45",
	bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45",
	left: "left-full top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45",
	right: "right-full top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45",
};

// ---------------------------------------------------------------------------
// SimpleTooltip — wraps a trigger and renders a positioned tooltip bubble
// ---------------------------------------------------------------------------

type SimpleTooltipProps = {
	tooltip: string;
	position: TooltipPosition;
	children: React.ReactNode;
};

function SimpleTooltip({ tooltip, position, children }: SimpleTooltipProps) {
	const [open, setOpen] = useState(false);
	const variants = VARIANTS[position];

	return (
		<div
			className="relative inline-flex"
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			{children}

			<AnimatePresence>
				{open && (
					<motion.div
						role="tooltip"
						className={[
							"pointer-events-none absolute z-50 whitespace-nowrap",
							TOOLTIP_POSITION_CLASSES[position],
						].join(" ")}
						variants={variants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={SPRING}
						style={{ originX: "50%", originY: "50%" }}
					>
						{/* Bubble */}
						<div className="relative rounded-lg bg-default-900/90 px-3 py-1.5 font-medium text-default-50 text-xs shadow-xl backdrop-blur-sm">
							{tooltip}

							{/* Arrow */}
							<span
								className={[
									"absolute h-2 w-2 rounded-[1px] bg-default-900/90",
									ARROW_POSITION_CLASSES[position],
								].join(" ")}
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

// ---------------------------------------------------------------------------
// RichTooltip — tooltip with icon + title + description, shown on card hover
// ---------------------------------------------------------------------------

type RichTooltipProps = {
	icon: React.ReactNode;
	title: string;
	description: string;
	position?: TooltipPosition;
	children: React.ReactNode;
};

function RichTooltip({
	icon,
	title,
	description,
	position = "top",
	children,
}: RichTooltipProps) {
	const [open, setOpen] = useState(false);
	const variants = VARIANTS[position];

	return (
		<div
			className="relative inline-flex"
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			{children}

			<AnimatePresence>
				{open && (
					<motion.div
						role="tooltip"
						className={[
							"pointer-events-none absolute z-50 w-56",
							TOOLTIP_POSITION_CLASSES[position],
						].join(" ")}
						variants={variants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={SPRING}
						style={{ originX: "50%", originY: "50%" }}
					>
						{/* Rich bubble */}
						<div className="relative rounded-xl bg-default-900/90 p-3.5 shadow-2xl backdrop-blur-sm">
							<div className="mb-2 flex items-center gap-2">
								<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400">
									{icon}
								</span>
								<span className="font-semibold text-default-50 text-sm">
									{title}
								</span>
							</div>
							<p className="text-default-400 text-xs leading-relaxed">
								{description}
							</p>

							{/* Arrow */}
							<span
								className={[
									"absolute h-2 w-2 rounded-[1px] bg-default-900/90",
									ARROW_POSITION_CLASSES[position],
								].join(" ")}
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SIMPLE_TOOLTIPS: TooltipConfig[] = [
	{
		id: "top",
		position: "top",
		label: "Hover me",
		tooltip: "Tooltip on top",
		color: "primary",
	},
	{
		id: "bottom",
		position: "bottom",
		label: "Hover me",
		tooltip: "Tooltip on bottom",
		color: "secondary",
	},
	{
		id: "left",
		position: "left",
		label: "Hover me",
		tooltip: "Tooltip on left",
		color: "success",
	},
	{
		id: "right",
		position: "right",
		label: "Hover me",
		tooltip: "Tooltip on right",
		color: "warning",
	},
];

const POSITION_LABELS: Record<TooltipPosition, string> = {
	top: "Top",
	bottom: "Bottom",
	left: "Left",
	right: "Right",
};

// ---------------------------------------------------------------------------
// HoverCard — the trigger for the rich tooltip example
// ---------------------------------------------------------------------------

function HoverCard() {
	return (
		<RichTooltip
			position="top"
			icon={<Sparkles className="h-4 w-4" />}
			title="Framer Motion"
			description="Spring-physics animations powered by Framer Motion with zero layout jank."
		>
			<div className="cursor-default rounded-2xl border border-default-200/60 bg-default-100/50 p-5 shadow-sm transition-shadow hover:shadow-md">
				<div className="mb-3 flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-sm">
						<Layers className="h-5 w-5 text-white" />
					</div>
					<div>
						<p className="font-semibold text-default-900 text-sm">
							UI Component
						</p>
						<p className="text-default-500 text-xs">Hover to preview details</p>
					</div>
				</div>
				<div className="flex flex-wrap gap-1.5">
					{["React", "Motion", "Tailwind"].map((tag) => (
						<span
							key={tag}
							className="rounded-full bg-default-200/70 px-2.5 py-0.5 text-default-600 text-xs"
						>
							{tag}
						</span>
					))}
				</div>
			</div>
		</RichTooltip>
	);
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function TooltipDemo() {
	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center gap-12 p-8">
			{/* Section label */}
			<div className="text-center">
				<p className="text-default-500 text-sm">
					Spring scale + fade — four directions
				</p>
			</div>

			{/* 2×2 grid — one button per position */}
			<div className="grid grid-cols-2 gap-x-16 gap-y-10 sm:grid-cols-4 sm:gap-x-10">
				{SIMPLE_TOOLTIPS.map(({ id, position, label, tooltip, color }) => (
					<div key={id} className="flex flex-col items-center gap-2">
						<SimpleTooltip tooltip={tooltip} position={position}>
							<Button
								color={color as "primary" | "secondary" | "success" | "warning"}
								variant="flat"
								size="sm"
							>
								{label}
							</Button>
						</SimpleTooltip>
						<span className="text-default-400 text-xs">
							{POSITION_LABELS[position]}
						</span>
					</div>
				))}
			</div>

			{/* Divider */}
			<div className="flex w-full max-w-xs items-center gap-3">
				<div className="h-px flex-1 bg-default-200" />
				<div className="flex items-center gap-1.5 text-default-400 text-xs">
					<Info className="h-3.5 w-3.5" />
					Rich content
				</div>
				<div className="h-px flex-1 bg-default-200" />
			</div>

			{/* Rich tooltip — card hover */}
			<div className="flex flex-col items-center gap-3">
				<HoverCard />
				<div className="flex items-center gap-1.5 text-default-400 text-xs">
					<Zap className="h-3 w-3" />
					Hover the card
				</div>
			</div>
		</div>
	);
}
