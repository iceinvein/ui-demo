import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

type TrailPoint = {
	id: number;
	x: number;
	y: number;
	colorIndex: number;
};

const MAX_TRAIL = 25;

// Palette cycles through vibrant hues for a gradient-like trail effect
const PALETTE = [
	"#a855f7", // violet
	"#8b5cf6", // purple
	"#6366f1", // indigo
	"#3b82f6", // blue
	"#06b6d4", // cyan
	"#10b981", // emerald
	"#22c55e", // green
	"#84cc16", // lime
	"#eab308", // yellow
	"#f97316", // orange
	"#ef4444", // red
	"#ec4899", // pink
	"#a855f7", // back to violet
];

export function CursorTrailDemo() {
	const [trail, setTrail] = useState<TrailPoint[]>([]);
	const idRef = useRef(0);
	const colorIndexRef = useRef(0);
	const isInsideRef = useRef(false);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const rect = e.currentTarget.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			idRef.current += 1;
			colorIndexRef.current = (colorIndexRef.current + 1) % PALETTE.length;

			const newPoint: TrailPoint = {
				id: idRef.current,
				x,
				y,
				colorIndex: colorIndexRef.current,
			};

			setTrail((prev) => {
				const next = [...prev, newPoint];
				return next.length > MAX_TRAIL ? next.slice(next.length - MAX_TRAIL) : next;
			});
		},
		[],
	);

	const handleMouseLeave = useCallback(() => {
		isInsideRef.current = false;
	}, []);

	const handleMouseEnter = useCallback(() => {
		isInsideRef.current = true;
	}, []);

	const removePoint = useCallback((id: number) => {
		setTrail((prev) => prev.filter((p) => p.id !== id));
	}, []);

	return (
		<div className="flex min-h-[500px] flex-col items-center justify-center gap-6 p-8">
			<motion.div
				className="flex flex-col items-center gap-2"
				initial={{ opacity: 0, y: -16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45 }}
			>
				<h2 className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text font-bold text-2xl text-transparent">
					Cursor Trail
				</h2>
				<p className="text-default-500 text-sm">
					Move your cursor inside the box
				</p>
			</motion.div>

			{/* Interactive container */}
			<motion.div
				className="relative min-h-[400px] w-full max-w-2xl cursor-none overflow-hidden rounded-2xl border border-default-200/60 bg-default-100/30"
				style={{
					background:
						"radial-gradient(ellipse at 30% 40%, rgba(168,85,247,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 65%, rgba(236,72,153,0.07) 0%, transparent 55%), radial-gradient(ellipse at 50% 10%, rgba(59,130,246,0.07) 0%, transparent 50%)",
				}}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				onMouseEnter={handleMouseEnter}
				initial={{ opacity: 0, scale: 0.97 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.15 }}
			>
				{/* Subtle grid overlay */}
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.04]"
					style={{
						backgroundImage:
							"linear-gradient(rgba(128,128,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,1) 1px, transparent 1px)",
						backgroundSize: "40px 40px",
					}}
				/>

				{/* Idle label — fades out once the user starts moving */}
				<motion.div
					className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3"
					animate={{ opacity: trail.length > 0 ? 0 : 1 }}
					transition={{ duration: 0.3 }}
				>
					<div className="flex gap-2">
						{[0, 4, 8].map((ci) => (
							<motion.div
								key={ci}
								className="h-3 w-3 rounded-full"
								style={{ backgroundColor: PALETTE[ci] }}
								animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
								transition={{
									duration: 1.6,
									delay: ci * 0.2,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							/>
						))}
					</div>
					<p className="text-default-400 text-sm tracking-wide">
						Move your cursor here
					</p>
				</motion.div>

				{/* Trail dots */}
				<AnimatePresence>
					{trail.map((point) => (
						<motion.div
							key={point.id}
							className="pointer-events-none absolute rounded-full"
							style={{
								left: point.x,
								top: point.y,
								width: 14,
								height: 14,
								marginLeft: -7,
								marginTop: -7,
								backgroundColor: PALETTE[point.colorIndex],
								boxShadow: `0 0 8px 2px ${PALETTE[point.colorIndex]}66`,
							}}
							initial={{ scale: 1, opacity: 0.85 }}
							animate={{ scale: 0, opacity: 0 }}
							transition={{ duration: 0.8, ease: "easeOut" }}
							onAnimationComplete={() => removePoint(point.id)}
						/>
					))}
				</AnimatePresence>
			</motion.div>

			{/* Legend row */}
			<motion.div
				className="flex items-center gap-1.5"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
			>
				{PALETTE.slice(0, 12).map((color, i) => (
					<div
						key={i}
						className="h-2 w-2 rounded-full"
						style={{ backgroundColor: color, opacity: 0.7 }}
					/>
				))}
			</motion.div>
		</div>
	);
}
