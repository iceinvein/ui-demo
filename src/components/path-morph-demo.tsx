import { Button } from "@heroui/button";
import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

// ---------------------------------------------------------------------------
// Shape generation — all paths share M + N×C + Z command structure.
// Catmull-Rom spline converts point arrays to smooth cubic bezier paths.
// ---------------------------------------------------------------------------

const N_PTS = 12;
const CX = 100;
const CY = 100;

function polarToXY(r: number, angleDeg: number): [number, number] {
	const rad = ((angleDeg - 90) * Math.PI) / 180;
	return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
}

function pointsToPath(pts: [number, number][]): string {
	const n = pts.length;
	const f = (v: number) => v.toFixed(2);
	let d = `M ${f(pts[0][0])} ${f(pts[0][1])} `;
	for (let i = 0; i < n; i++) {
		const p0 = pts[(i - 1 + n) % n];
		const p1 = pts[i];
		const p2 = pts[(i + 1) % n];
		const p3 = pts[(i + 2) % n];
		const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
		const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
		const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
		const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
		d += `C ${f(cp1x)} ${f(cp1y)}, ${f(cp2x)} ${f(cp2y)}, ${f(p2[0])} ${f(p2[1])} `;
	}
	return d + "Z";
}

const CIRCLE = pointsToPath(
	Array.from({ length: N_PTS }, (_, i) =>
		polarToXY(70, (i / N_PTS) * 360),
	),
);

const STAR = pointsToPath(
	Array.from({ length: N_PTS }, (_, i) =>
		polarToXY(i % 2 === 0 ? 78 : 30, (i / N_PTS) * 360),
	),
);

const ROUNDED_SQUARE = pointsToPath(
	Array.from({ length: N_PTS }, (_, i) => {
		const rad = ((i / N_PTS) * 360 - 90) * (Math.PI / 180);
		const c = Math.cos(rad);
		const s = Math.sin(rad);
		const exp = 8;
		const r =
			68 /
			Math.pow(
				Math.pow(Math.abs(c), exp) + Math.pow(Math.abs(s), exp),
				1 / exp,
			);
		return [CX + r * c, CY + r * s] as [number, number];
	}),
);

// Heart — 12 manually-placed points clockwise from bottom tip
const HEART = pointsToPath([
	[100, 170], // bottom point
	[122, 148], // lower-right
	[152, 115], // right side
	[168, 82],  // upper-right
	[152, 50],  // right lobe top
	[126, 42],  // right lobe inner
	[100, 62],  // center dip
	[74, 42],   // left lobe inner
	[48, 50],   // left lobe top
	[32, 82],   // upper-left
	[48, 115],  // left side
	[78, 148],  // lower-left
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
