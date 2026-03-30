import { Button } from "@heroui/button";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Shape generation — all paths: M + 12×C + Z.
// Three path generators for different geometry types:
//   smoothPath  — Catmull-Rom spline (organic curves: circle, heart)
//   linearPath  — straight edges via 1/3–2/3 control points (star)
//   Hardcoded   — precise corner arcs + flat sides (rounded rectangle)
// ---------------------------------------------------------------------------

const N_PTS = 12;
const CX = 100;
const CY = 100;
const F = (v: number) => v.toFixed(2);

function polarToXY(r: number, angleDeg: number): [number, number] {
	const rad = ((angleDeg - 90) * Math.PI) / 180;
	return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
}

/** Catmull-Rom spline — smooth organic curves through all points */
function smoothPath(pts: [number, number][]): string {
	const n = pts.length;
	let d = `M ${F(pts[0][0])} ${F(pts[0][1])} `;
	for (let i = 0; i < n; i++) {
		const p0 = pts[(i - 1 + n) % n];
		const p1 = pts[i];
		const p2 = pts[(i + 1) % n];
		const p3 = pts[(i + 2) % n];
		d += `C ${F(p1[0] + (p2[0] - p0[0]) / 6)} ${F(p1[1] + (p2[1] - p0[1]) / 6)}, ${F(p2[0] - (p3[0] - p1[0]) / 6)} ${F(p2[1] - (p3[1] - p1[1]) / 6)}, ${F(p2[0])} ${F(p2[1])} `;
	}
	return d + "Z";
}

/** Straight-line segments — control points at 1/3 and 2/3 for sharp geometry */
function linearPath(pts: [number, number][]): string {
	const n = pts.length;
	let d = `M ${F(pts[0][0])} ${F(pts[0][1])} `;
	for (let i = 0; i < n; i++) {
		const a = pts[i];
		const b = pts[(i + 1) % n];
		d += `C ${F(a[0] + (b[0] - a[0]) / 3)} ${F(a[1] + (b[1] - a[1]) / 3)}, ${F(a[0] + (2 * (b[0] - a[0])) / 3)} ${F(a[1] + (2 * (b[1] - a[1])) / 3)}, ${F(b[0])} ${F(b[1])} `;
	}
	return d + "Z";
}

// Circle — smooth Catmull-Rom through 12 evenly-spaced points
const CIRCLE = smoothPath(
	Array.from({ length: N_PTS }, (_, i) =>
		polarToXY(70, (i / N_PTS) * 360),
	),
);

// Star — 6-pointed with perfectly straight edges between tips and valleys
const STAR = linearPath(
	Array.from({ length: N_PTS }, (_, i) =>
		polarToXY(i % 2 === 0 ? 78 : 30, (i / N_PTS) * 360),
	),
);

// Rounded rectangle — exact geometry with flat sides + circular corner arcs
// Bounds [35,165]², corner radius 22, k = 0.5523·r for 90° bezier arc
const ROUNDED_SQUARE = (() => {
	const L = 35, R = 165, T = 35, B = 165, r = 22;
	const k = 0.5523 * r;
	return [
		`M ${F(100)} ${F(T)}`,
		`C ${F(114.33)} ${F(T)}, ${F(128.67)} ${F(T)}, ${F(R - r)} ${F(T)}`,
		`C ${F(R - r + k)} ${F(T)}, ${F(R)} ${F(T + r - k)}, ${F(R)} ${F(T + r)}`,
		`C ${F(R)} ${F(71.33)}, ${F(R)} ${F(85.67)}, ${F(R)} ${F(100)}`,
		`C ${F(R)} ${F(114.33)}, ${F(R)} ${F(128.67)}, ${F(R)} ${F(B - r)}`,
		`C ${F(R)} ${F(B - r + k)}, ${F(R - r + k)} ${F(B)}, ${F(R - r)} ${F(B)}`,
		`C ${F(128.67)} ${F(B)}, ${F(114.33)} ${F(B)}, ${F(100)} ${F(B)}`,
		`C ${F(85.67)} ${F(B)}, ${F(71.33)} ${F(B)}, ${F(L + r)} ${F(B)}`,
		`C ${F(L + r - k)} ${F(B)}, ${F(L)} ${F(B - r + k)}, ${F(L)} ${F(B - r)}`,
		`C ${F(L)} ${F(128.67)}, ${F(L)} ${F(114.33)}, ${F(L)} ${F(100)}`,
		`C ${F(L)} ${F(85.67)}, ${F(L)} ${F(71.33)}, ${F(L)} ${F(T + r)}`,
		`C ${F(L)} ${F(T + r - k)}, ${F(L + r - k)} ${F(T)}, ${F(L + r)} ${F(T)}`,
		`C ${F(71.33)} ${F(T)}, ${F(85.67)} ${F(T)}, ${F(100)} ${F(T)}`,
		"Z",
	].join(" ");
})();

// Heart — smooth Catmull-Rom through 12 hand-placed control points
const HEART = smoothPath([
	[100, 170], [122, 148], [152, 115], [168, 82],
	[152, 50], [126, 42], [100, 62], [74, 42],
	[48, 50], [32, 82], [48, 115], [78, 148],
]);

type ShapeKey = 0 | 1 | 2 | 3;

type ShapeConfig = {
	label: string;
	path: string;
	fill: string;
	stroke: string;
	glowColor: string;
	name: string;
};

const SHAPES: Record<ShapeKey, ShapeConfig> = {
	0: {
		label: "Circle",
		path: CIRCLE,
		fill: "rgba(139,92,246,0.25)",
		stroke: "#8b5cf6",
		glowColor: "rgba(139,92,246,0.4)",
		name: "Circle",
	},
	1: {
		label: "Star",
		path: STAR,
		fill: "rgba(245,158,11,0.25)",
		stroke: "#f59e0b",
		glowColor: "rgba(245,158,11,0.4)",
		name: "Star",
	},
	2: {
		label: "Square",
		path: ROUNDED_SQUARE,
		fill: "rgba(16,185,129,0.25)",
		stroke: "#10b981",
		glowColor: "rgba(16,185,129,0.4)",
		name: "Rounded Square",
	},
	3: {
		label: "Heart",
		path: HEART,
		fill: "rgba(236,72,153,0.25)",
		stroke: "#ec4899",
		glowColor: "rgba(236,72,153,0.4)",
		name: "Heart",
	},
};

const SHAPE_KEYS: ShapeKey[] = [0, 1, 2, 3];
const AUTO_ADVANCE_MS = 2800;

export function PathMorphDemo() {
	const [activeShape, setActiveShape] = useState<ShapeKey>(0);
	const [isPlaying, setIsPlaying] = useState(true);

	// Motion values for the animated path d and colors
	const fillMotion = useMotionValue(SHAPES[0].fill);
	const strokeMotion = useMotionValue(SHAPES[0].stroke);

	// Auto-cycle
	useEffect(() => {
		if (!isPlaying) return;
		const id = setInterval(() => {
			setActiveShape((prev) => ((prev + 1) % 4) as ShapeKey);
		}, AUTO_ADVANCE_MS);
		return () => clearInterval(id);
	}, [isPlaying]);

	// Animate fill/stroke colors when shape changes
	useEffect(() => {
		const target = SHAPES[activeShape];
		animate(fillMotion, target.fill, {
			duration: 0.6,
			ease: "easeInOut",
		});
		animate(strokeMotion, target.stroke, {
			duration: 0.6,
			ease: "easeInOut",
		});
	}, [activeShape, fillMotion, strokeMotion]);

	const handleShapeSelect = (key: ShapeKey) => {
		setActiveShape(key);
		setIsPlaying(false);
	};

	const currentShape = SHAPES[activeShape];

	return (
		<div className="flex min-h-[500px] flex-col items-center justify-center gap-8 p-8">
			{/* Title */}
			<div className="text-center">
				<motion.h2
					className="mb-1 bg-gradient-to-r from-violet-500 via-pink-500 to-amber-400 bg-clip-text font-bold text-2xl text-transparent"
					initial={{ opacity: 0, y: -12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					SVG Path Morphing
				</motion.h2>
				<motion.p
					className="text-default-500 text-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					Smooth spring-based interpolation between shapes
				</motion.p>
			</div>

			{/* SVG stage */}
			<motion.div
				className="relative flex items-center justify-center"
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.1 }}
			>
				{/* Glow layer — blurred duplicate for ambient effect */}
				<svg
					viewBox="0 0 200 200"
					width={220}
					height={220}
					aria-hidden="true"
					className="absolute blur-2xl"
					style={{ opacity: 0.55 }}
				>
					<motion.path
						d={currentShape.path}
						fill={currentShape.glowColor}
						stroke="none"
						animate={{ d: currentShape.path }}
						transition={{
							type: "spring",
							stiffness: 200,
							damping: 20,
						}}
					/>
				</svg>

				{/* Main SVG */}
				<svg
					viewBox="0 0 200 200"
					width={220}
					height={220}
					role="img"
					aria-label={`Animated shape: ${currentShape.name}`}
				>
					<motion.path
						d={currentShape.path}
						fill={fillMotion}
						stroke={strokeMotion}
						strokeWidth={2.5}
						strokeLinejoin="round"
						animate={{ d: currentShape.path }}
						transition={{
							type: "spring",
							stiffness: 200,
							damping: 20,
						}}
					/>
				</svg>
			</motion.div>

			{/* Active shape label */}
			<motion.div
				key={activeShape}
				initial={{ opacity: 0, y: 6 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -6 }}
				className="text-center"
			>
				<span
					className="inline-block rounded-full border px-4 py-1 font-medium text-sm"
					style={{
						borderColor: currentShape.stroke,
						color: currentShape.stroke,
						backgroundColor: currentShape.fill,
					}}
				>
					{currentShape.name}
				</span>
			</motion.div>

			{/* Shape selector buttons */}
			<div className="flex flex-wrap items-center justify-center gap-3">
				{SHAPE_KEYS.map((key) => {
					const shape = SHAPES[key];
					const isActive = activeShape === key;
					return (
						<Button
							key={key}
							size="sm"
							variant={isActive ? "solid" : "bordered"}
							onPress={() => handleShapeSelect(key)}
							style={
								isActive
									? {
											backgroundColor: shape.stroke,
											color: "#fff",
											borderColor: shape.stroke,
										}
									: { borderColor: shape.stroke, color: shape.stroke }
							}
							className="min-w-[80px] font-medium transition-all"
						>
							{shape.label}
						</Button>
					);
				})}
			</div>

			{/* Auto-play toggle */}
			<Button
				size="sm"
				variant="light"
				onPress={() => setIsPlaying((p) => !p)}
				className="text-default-500 text-xs"
			>
				{isPlaying ? "Pause auto-cycle" : "Resume auto-cycle"}
			</Button>
		</div>
	);
}
