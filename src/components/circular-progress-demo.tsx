import { Button } from "@heroui/button";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type RingConfig = {
	id: string;
	size: number;
	strokeWidth: number;
	target: number;
	label: string;
	/** Tailwind / CSS color for the progress arc */
	color: string;
	/** Tailwind / CSS color for the background track */
	trackColor: string;
	/** Optional gradient id — when set, the stroke uses a linearGradient */
	gradientId?: string;
	gradientFrom?: string;
	gradientTo?: string;
	/** If true, render dashed segments instead of a solid arc */
	dashed?: boolean;
	/** Spring stiffness — lets each ring feel different */
	stiffness?: number;
	damping?: number;
	delay?: number;
};

const RINGS: RingConfig[] = [
	{
		id: "large",
		size: 120,
		strokeWidth: 10,
		target: 75,
		label: "Performance",
		color: "#6366f1", // indigo-500
		trackColor: "#6366f120",
		stiffness: 60,
		damping: 18,
		delay: 0,
	},
	{
		id: "gradient",
		size: 80,
		strokeWidth: 8,
		target: 92,
		label: "Quality",
		color: "url(#grad-quality)",
		trackColor: "#ec489920",
		gradientId: "grad-quality",
		gradientFrom: "#ec4899",
		gradientTo: "#f97316",
		stiffness: 50,
		damping: 15,
		delay: 0.08,
	},
	{
		id: "small",
		size: 60,
		strokeWidth: 7,
		target: 45,
		label: "Coverage",
		color: "#10b981", // emerald-500
		trackColor: "#10b98120",
		stiffness: 80,
		damping: 20,
		delay: 0.16,
	},
	{
		id: "dashed",
		size: 80,
		strokeWidth: 6,
		target: 68,
		label: "Uptime",
		color: "#f59e0b", // amber-500
		trackColor: "#f59e0b20",
		dashed: true,
		stiffness: 55,
		damping: 16,
		delay: 0.24,
	},
];

// ---------------------------------------------------------------------------
// Individual ring
// ---------------------------------------------------------------------------

type CircularRingProps = {
	config: RingConfig;
	/** Incrementing this key restarts all animations */
	replayKey: number;
};

function CircularRing({ config, replayKey }: CircularRingProps) {
	const {
		size,
		strokeWidth,
		target,
		label,
		color,
		trackColor,
		gradientId,
		gradientFrom,
		gradientTo,
		dashed,
		stiffness = 60,
		damping = 18,
		delay = 0,
	} = config;

	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;

	// Motion value drives both the SVG arc and the counter text.
	const progress = useMotionValue(0);

	// Map 0-100 → circumference → 0  (full circle when progress=100)
	const strokeDashoffset = useTransform(progress, [0, 100], [circumference, 0]);

	// Sync motion value → React state for the counter display
	const [displayValue, setDisplayValue] = useState(0);
	useEffect(() => {
		return progress.on("change", (v) => setDisplayValue(Math.round(v)));
	}, [progress]);

	// Re-run the animation whenever replayKey changes.
	// biome-ignore lint/correctness/useExhaustiveDependencies: replayKey is intentionally used as a replay trigger
	useEffect(() => {
		// Reset immediately to 0, then animate to target with a spring.
		progress.set(0);

		const controls = animate(progress, target, {
			type: "spring",
			stiffness,
			damping,
			delay,
			// springs can overshoot — clamp to [0, 100]
			onUpdate: (v) => {
				if (v > 100) progress.set(100);
				if (v < 0) progress.set(0);
			},
		});

		return () => controls.stop();
	}, [replayKey, progress, target, stiffness, damping, delay]);

	// Dashed stroke: create evenly-spaced short dashes that together form the
	// arc. We only render dashes up to the target percentage — achieved by
	// still using stroke-dashoffset on the dashed arc.
	const dashArray = dashed
		? `${circumference / 20} ${circumference / 40}`
		: undefined;

	// Font sizes scale with ring size.
	const valueFontSize = size >= 100 ? 22 : size >= 75 ? 16 : 13;
	const labelFontSize = size >= 100 ? 10 : size >= 75 ? 9 : 8;

	return (
		<motion.div
			className="flex flex-col items-center gap-3"
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: delay + 0.05, duration: 0.4, ease: "easeOut" }}
		>
			{/* SVG ring */}
			<div className="relative" style={{ width: size, height: size }}>
				<svg
					width={size}
					height={size}
					viewBox={`0 0 ${size} ${size}`}
					style={{ overflow: "visible" }}
				>
					{/* Gradient definition (only rendered when needed) */}
					{gradientId && gradientFrom && gradientTo && (
						<defs>
							<linearGradient
								id={gradientId}
								x1="0%"
								y1="0%"
								x2="100%"
								y2="100%"
							>
								<stop offset="0%" stopColor={gradientFrom} />
								<stop offset="100%" stopColor={gradientTo} />
							</linearGradient>
						</defs>
					)}

					{/* Background track */}
					<circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill="none"
						stroke={trackColor}
						strokeWidth={strokeWidth}
					/>

					{/* Animated progress arc */}
					<motion.circle
						cx={size / 2}
						cy={size / 2}
						r={radius}
						fill="none"
						stroke={color}
						strokeWidth={strokeWidth}
						strokeLinecap={dashed ? "butt" : "round"}
						strokeDasharray={dashArray ?? circumference}
						style={{ strokeDashoffset }}
						// SVG starts at 3 o'clock — rotate -90° to start at 12 o'clock
						transform={`rotate(-90 ${size / 2} ${size / 2})`}
					/>
				</svg>

				{/* Centered percentage counter */}
				<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
					<span
						className="font-bold text-default-900 tabular-nums leading-none"
						style={{ fontSize: valueFontSize }}
					>
						<span>{displayValue}</span>
						<span
							className="text-default-500"
							style={{ fontSize: valueFontSize * 0.6 }}
						>
							%
						</span>
					</span>
				</div>
			</div>

			{/* Label */}
			<span
				className="font-medium text-default-500 uppercase tracking-wide"
				style={{ fontSize: labelFontSize + 1 }}
			>
				{label}
			</span>
		</motion.div>
	);
}

// ---------------------------------------------------------------------------
// Demo container
// ---------------------------------------------------------------------------

export function CircularProgressDemo() {
	const [replayKey, setReplayKey] = useState(0);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleReplay = () => {
		setReplayKey((k) => k + 1);
	};

	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center gap-10 p-8">
			{/* Title */}
			<motion.div
				className="flex flex-col items-center gap-1 text-center"
				initial={{ opacity: 0, y: -12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
			>
				<h2 className="bg-linear-to-r from-indigo-500 via-pink-500 to-amber-500 bg-clip-text font-bold text-2xl text-transparent">
					Circular Progress
				</h2>
				<p className="text-default-500 text-sm">
					SVG rings animated with Framer Motion springs
				</p>
			</motion.div>

			{/* Rings row */}
			<div className="flex flex-wrap items-end justify-center gap-10">
				{RINGS.map((ring) => (
					<CircularRing key={ring.id} config={ring} replayKey={replayKey} />
				))}
			</div>

			{/* Replay button */}
			<span
				ref={buttonRef as React.RefObject<HTMLSpanElement>}
				className="inline-block"
			>
				<Button
					color="primary"
					variant="shadow"
					onPress={handleReplay}
					className="px-8 font-semibold"
				>
					Replay
				</Button>
			</span>
		</div>
	);
}
