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

// All shapes: M + 24×C + Z (24 segments for smooth interpolation)

// Circle — 24 smooth Catmull-Rom points
const CIRCLE = smoothPath(
	Array.from({ length: 24 }, (_, i) => polarToXY(70, (i / 24) * 360)),
);

// Star — 6-pointed, 12 vertices doubled with midpoints → 24 straight segments
const STAR = (() => {
	const base: [number, number][] = Array.from({ length: 12 }, (_, i) =>
		polarToXY(i % 2 === 0 ? 78 : 30, (i / 12) * 360),
	);
	const pts: [number, number][] = [];
	for (let i = 0; i < base.length; i++) {
		const a = base[i];
		const b = base[(i + 1) % base.length];
		pts.push(a, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]);
	}
	return linearPath(pts);
})();

// Rounded rectangle — 24 segments: 16 straight + 8 arc (4 corners × 2 × 45°)
const ROUNDED_SQUARE = (() => {
	const L = 35, R = 165, T = 35, B = 165, cr = 22;
	const k = (4 / 3) * Math.tan(Math.PI / 8) * cr; // 45° arc handle

	const s = (x1: number, y1: number, x2: number, y2: number) =>
		`C ${F(x1 + (x2 - x1) / 3)} ${F(y1 + (y2 - y1) / 3)}, ${F(x1 + (2 * (x2 - x1)) / 3)} ${F(y1 + (2 * (y2 - y1)) / 3)}, ${F(x2)} ${F(y2)}`;

	const a45 = (cx: number, cy: number, a: number) => {
		const a2 = a + Math.PI / 4;
		const ex = cx + cr * Math.cos(a2);
		const ey = cy + cr * Math.sin(a2);
		const sx = cx + cr * Math.cos(a);
		const sy = cy + cr * Math.sin(a);
		return `C ${F(sx + k * -Math.sin(a))} ${F(sy + k * Math.cos(a))}, ${F(ex - k * -Math.sin(a2))} ${F(ey - k * Math.cos(a2))}, ${F(ex)} ${F(ey)}`;
	};

	return [
		`M ${F(100)} ${F(T)}`,
		s(100, T, 121.5, T),              s(121.5, T, R - cr, T),
		a45(R - cr, T + cr, -Math.PI / 2), a45(R - cr, T + cr, -Math.PI / 4),
		s(R, T + cr, R, 78.5),            s(R, 78.5, R, 100),
		s(R, 100, R, 121.5),              s(R, 121.5, R, B - cr),
		a45(R - cr, B - cr, 0),            a45(R - cr, B - cr, Math.PI / 4),
		s(R - cr, B, 121.5, B),           s(121.5, B, 100, B),
		s(100, B, 78.5, B),               s(78.5, B, L + cr, B),
		a45(L + cr, B - cr, Math.PI / 2),  a45(L + cr, B - cr, (3 * Math.PI) / 4),
		s(L, B - cr, L, 121.5),           s(L, 121.5, L, 100),
		s(L, 100, L, 78.5),               s(L, 78.5, L, T + cr),
		a45(L + cr, T + cr, Math.PI),      a45(L + cr, T + cr, (5 * Math.PI) / 4),
		s(L + cr, T, 78.5, T),            s(78.5, T, 100, T),
		"Z",
	].join(" ");
})();

// Heart — 24 hand-placed points for smooth Catmull-Rom curves
const HEART = smoothPath([
	[100, 170], [110, 160], [122, 148], [138, 130],
	[152, 112], [162, 95],  [168, 78],  [164, 62],
	[154, 50],  [140, 43],  [126, 42],  [112, 48],
	[100, 62],  [88, 48],   [74, 42],   [60, 43],
	[46, 50],   [36, 62],   [32, 78],   [38, 95],
	[48, 112],  [62, 130],  [78, 148],  [90, 160],
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
