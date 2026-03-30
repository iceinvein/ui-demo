import { Button } from "@heroui/button";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// All paths share the exact same command sequence:
//   M  then 12× C  then Z
// (4 cubic-bezier segments × 3 curves each = 12 C commands)
// Viewbox: "0 0 200 200", shapes centered at (100, 100).
// ---------------------------------------------------------------------------

// Shape 0 — Circle (r ≈ 70, approximated with 4 cubic bezier arcs)
// Magic number for circular bezier approximation: k ≈ 0.5523
// We split each quadrant arc into 3 C segments (12 total).
//
// The strategy: divide the circle into 12 equal arcs (30° each), then
// express each as a cubic bezier. For a 30° arc on radius 70 centered at 100,100:
//   handle-length h = (4/3)*tan(π/24)*70 ≈ 0.2679*70*tan(7.5°) ... easier to
//   just list computed coordinates explicitly.
//
// We use 4 quadrant arcs, each split into 3 C-segments ——> 12 C total.
// Quadrant arc (90°) on radius 70:  control arm k=0.5523*70≈38.66
//
// Circle starting at top (100, 30):
//   Q1: (100,30) -> (170,100)  controls: (138.66,30) (170,61.34)
//   Q2: (170,100) -> (100,170) controls: (170,138.66) (138.66,170)
//   Q3: (100,170) -> (30,100)  controls: (61.34,170) (30,138.66)
//   Q4: (30,100)  -> (100,30)  controls: (30,61.34) (61.34,30)
//
// Each quadrant arc is split evenly into 3 C commands (30° each):
// Points on circle at 0°=top, then every 30° clockwise:
//   0°:  (100, 30)
//  30°:  (100+70*sin30, 100-70*cos30) = (135, 39.41)
//  60°:  (100+70*sin60, 100-70*cos60) = (160.62, 65)
//  90°:  (170, 100)
// 120°:  (160.62, 135)
// 150°:  (135, 160.62)
// 180°:  (100, 170)
// 210°:  (65, 160.62)
// 240°:  (39.38, 135)
// 270°:  (30, 100)
// 300°:  (39.38, 65)
// 330°:  (65, 39.41)
//
// Bezier control handles for a 30° arc on radius 70:
//   h = (4/3)*tan(π/12)*70 = (4/3)*tan(15°)*70 ≈ (4/3)*0.2679*70 ≈ 24.94
//
// Perpendicular handle rotated 90° from the tangent at each point.

const CIRCLE =
	"M 100 30 " +
	// 0° → 30°  (100,30) → (135,39.41)
	"C 113.66 30, 126.27 34.14, 135 39.41 " +
	// 30° → 60°  → (160.62,65)
	"C 148.7 47.5, 157.5 56.3, 160.62 65 " +
	// 60° → 90°  → (170,100)
	"C 166.87 77.07, 170 88.34, 170 100 " +
	// 90° → 120°  → (160.62,135)
	"C 170 111.66, 166.87 122.93, 160.62 135 " +
	// 120° → 150°  → (135,160.62)
	"C 157.5 143.7, 148.7 152.5, 135 160.62 " +
	// 150° → 180°  → (100,170)
	"C 126.27 165.86, 113.66 170, 100 170 " +
	// 180° → 210°  → (65,160.62)
	"C 86.34 170, 73.73 165.86, 65 160.62 " +
	// 210° → 240°  → (39.38,135)
	"C 51.3 152.5, 42.5 143.7, 39.38 135 " +
	// 240° → 270°  → (30,100)
	"C 33.13 122.93, 30 111.66, 30 100 " +
	// 270° → 300°  → (39.38,65)
	"C 30 88.34, 33.13 77.07, 39.38 65 " +
	// 300° → 330°  → (65,39.41)
	"C 42.5 56.3, 51.3 47.5, 65 39.41 " +
	// 330° → 360°  → (100,30)
	"C 73.73 34.14, 86.34 30, 100 30 Z";

// Shape 1 — 6-point star
// The star has 6 outer tips (r=72) and 6 inner valleys (r=36),
// alternating every 30°.  Same M + 12 C + Z structure — each C
// connects one tip to the next valley (or valley to next tip) using
// control points pulled toward center to keep the sides straight-ish.
//
// Angles (0° = top, clockwise):
//   0°  outer tip  (100, 28)         [r=72]
//  30°  inner val  (100+36*sin30, 100-36*cos30) = (118, 68.82)   [r=36]
//  60°  outer tip  (100+72*sin60, 100-72*cos60) = (162.35, 64)   [r=72]
//  90°  inner val  (136, 100)         [r=36]
// 120°  outer tip  (162.35, 136)
// 150°  inner val  (118, 131.18)
// 180°  outer tip  (100, 172)
// 210°  inner val  (82, 131.18)
// 240°  outer tip  (37.65, 136)
// 270°  inner val  (64, 100)
// 300°  outer tip  (37.65, 64)
// 330°  inner val  (82, 68.82)
//
// Control points: for a straight-sided star edge, controls sit at 1/3 and 2/3
// of the straight line between consecutive points.

const STAR =
	"M 100 28 " +
	// tip(0°) → valley(30°)
	"C 107.5 40.5, 113 55, 118 68.82 " +
	// valley(30°) → tip(60°)
	"C 132 62, 147 59, 162.35 64 " +
	// tip(60°) → valley(90°)
	"C 155 75, 145 84, 136 100 " +
	// valley(90°) → tip(120°)
	"C 147 109, 155 121, 162.35 136 " +
	// tip(120°) → valley(150°)
	"C 145 137, 132 136, 118 131.18 " +
	// valley(150°) → tip(180°)
	"C 113 143, 107.5 157.5, 100 172 " +
	// tip(180°) → valley(210°)
	"C 92.5 157.5, 87 143, 82 131.18 " +
	// valley(210°) → tip(240°)
	"C 68 136, 55 137, 37.65 136 " +
	// tip(240°) → valley(270°)
	"C 45 121, 55 109, 64 100 " +
	// valley(270°) → tip(300°)
	"C 55 84, 45 75, 37.65 64 " +
	// tip(300°) → valley(330°)
	"C 53 59, 68 62, 82 68.82 " +
	// valley(330°) → tip(0°/360°)
	"C 87 55, 92.5 40.5, 100 28 Z";

// Shape 2 — Rounded square (r=65, corner radius≈22)
// A square with highly rounded corners, expressed as 12 C commands.
// The square spans roughly [35,165]×[35,165].
// Each side is split into 3 C segments: corner-arc, straight, corner-arc.
//
// Straight top goes 0° → 90° on bounding box in 3 hops, with the
// corner arcs controlling the "roundness".

const ROUNDED_SQUARE =
	"M 100 35 " +
	// Top edge center → top-right corner start
	"C 120 35, 140 35, 154 40 " +
	// Top-right corner arc
	"C 163 44, 165 52, 165 65 " +
	// Right edge top → right edge bottom (approaching bottom-right start)
	"C 165 80, 165 85, 165 100 " +
	// Right edge continued → bottom-right corner start
	"C 165 115, 165 120, 165 135 " +
	// Bottom-right corner arc
	"C 165 148, 163 156, 154 160 " +
	// Bottom edge right → center
	"C 140 165, 120 165, 100 165 " +
	// Bottom edge center → left
	"C 80 165, 60 165, 46 160 " +
	// Bottom-left corner arc
	"C 37 156, 35 148, 35 135 " +
	// Left edge bottom → mid
	"C 35 120, 35 115, 35 100 " +
	// Left edge mid → top
	"C 35 85, 35 80, 35 65 " +
	// Top-left corner arc
	"C 35 52, 37 44, 46 40 " +
	// Top edge left → center
	"C 60 35, 80 35, 100 35 Z";

// Shape 3 — Heart
// Classic heart centered at (100,100), sized ~140×130.
// Top-center dip at (100,55), left bump top at (70,40), right at (130,40),
// bottom point at (100,168).
// 12 C commands: left lobe (6) + right lobe (6).

const HEART =
	"M 100 168 " +
	// Bottom point → lower-left curve
	"C 88 155, 60 138, 45 120 " +
	// Lower-left curve continues upward
	"C 30 104, 30 84, 38 70 " +
	// Left lobe lower → upper
	"C 46 56, 58 44, 70 40 " +
	// Left lobe top → center dip
	"C 80 36, 90 40, 100 55 " +
	// Center dip — tiny segment bridging to right side
	"C 103 50, 106 46, 110 43 " +
	// Right lobe upper
	"C 116 39, 124 37, 130 40 " +
	// Right lobe top → upper-right
	"C 142 44, 154 56, 162 70 " +
	// Right lobe mid
	"C 170 84, 170 104, 155 120 " +
	// Right lobe lower
	"C 140 138, 112 155, 100 168 " +
	// Symmetric closing right → bottom
	"C 100 168, 100 168, 100 168 " +
	// Tiny noop segment (pad to 12 C total)
	"C 100 168, 100 168, 100 168 " +
	"C 100 168, 100 168, 100 168 Z";

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
