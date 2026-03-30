import { Button } from "@heroui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

// --- Types ---

type Shape = "circle" | "square" | "rectangle";

type Particle = {
	id: number;
	// Initial burst position relative to the container (set to button center)
	originX: number;
	originY: number;
	// Final resting position offset from origin
	targetX: number;
	targetY: number;
	color: string;
	width: number;
	height: number;
	shape: Shape;
	// degrees
	initialRotation: number;
	finalRotation: number;
	// animation timing
	duration: number;
	delay: number;
};

// --- Constants ---

const PALETTE = [
	"#f43f5e", // rose-500
	"#f97316", // orange-500
	"#eab308", // yellow-500
	"#22c55e", // green-500
	"#3b82f6", // blue-500
	"#a855f7", // purple-500
	"#ec4899", // pink-500
	"#06b6d4", // cyan-500
];

const SHAPES: Shape[] = ["circle", "square", "rectangle"];

// --- Helpers ---

function randomBetween(min: number, max: number) {
	return min + Math.random() * (max - min);
}

function randomItem<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

function buildParticles(
	count: number,
	originX: number,
	originY: number,
): Particle[] {
	return Array.from({ length: count }, (_, i) => {
		const shape = randomItem(SHAPES);
		const baseSize = randomBetween(6, 12);
		const width = shape === "rectangle" ? baseSize * 2 : baseSize;
		const height = baseSize;

		// Spread particles in all directions with arc-like trajectories.
		// Use an angle spread so coverage is uniform across 360 degrees.
		const angle = randomBetween(0, Math.PI * 2);
		// Horizontal speed — faster spread sideways
		const speedH = randomBetween(80, 260);
		// Vertical speed — initial upward burst; gravity will pull down afterward
		const speedV = randomBetween(120, 320);

		// Gravity effect baked into targetY: particles arc up then land lower
		// The upward component is negative (screen-up), gravity adds to Y.
		// We simulate gravity by making targetY a net downward offset.
		const gravityFactor = randomBetween(200, 400);
		const targetX = Math.cos(angle) * speedH;
		// Net vertical displacement: initial upward throw dominated by gravity landing
		const targetY = -Math.sin(angle) * speedV + gravityFactor;

		return {
			id: i,
			originX,
			originY,
			targetX,
			targetY,
			color: randomItem(PALETTE),
			width,
			height,
			shape,
			initialRotation: randomBetween(-180, 180),
			finalRotation: randomBetween(-720, 720),
			duration: randomBetween(1.6, 2.4),
			delay: randomBetween(0, 0.12),
		};
	});
}

function borderRadiusForShape(shape: Shape): string {
	if (shape === "circle") return "9999px";
	if (shape === "square") return "2px";
	// rectangle
	return "3px";
}

// --- Component ---

export function ConfettiDemo() {
	const [particles, setParticles] = useState<Particle[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const nextIdRef = useRef(0);

	const handleCelebrate = useCallback(() => {
		if (!containerRef.current || !buttonRef.current) return;

		const containerRect = containerRef.current.getBoundingClientRect();
		const buttonRect = buttonRef.current.getBoundingClientRect();

		// Origin = center of button relative to container
		const originX =
			buttonRect.left - containerRect.left + buttonRect.width / 2;
		const originY =
			buttonRect.top - containerRect.top + buttonRect.height / 2;

		const count = Math.floor(randomBetween(40, 61));
		const baseId = nextIdRef.current;
		nextIdRef.current += count;

		const newParticles = buildParticles(count, originX, originY).map(
			(p, i) => ({ ...p, id: baseId + i }),
		);

		setParticles((prev) => [...prev, ...newParticles]);
	}, []);

	const removeParticle = useCallback((id: number) => {
		setParticles((prev) => prev.filter((p) => p.id !== id));
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative min-h-[500px] overflow-hidden p-8"
		>
			{/* Particle layer */}
			<AnimatePresence>
				{particles.map((p) => (
					<motion.div
						key={p.id}
						// Position absolutely from the burst origin
						style={{
							position: "absolute",
							left: p.originX,
							top: p.originY,
							width: p.width,
							height: p.height,
							backgroundColor: p.color,
							borderRadius: borderRadiusForShape(p.shape),
							// Center the particle on its origin point
							translateX: "-50%",
							translateY: "-50%",
							pointerEvents: "none",
							willChange: "transform, opacity",
						}}
						initial={{
							x: 0,
							y: 0,
							rotate: p.initialRotation,
							opacity: 1,
							scale: 1,
						}}
						animate={{
							x: p.targetX,
							y: p.targetY,
							rotate: p.finalRotation,
							opacity: 0,
							scale: randomBetween(0.3, 0.7),
						}}
						transition={{
							duration: p.duration,
							delay: p.delay,
							ease: [0.25, 0.46, 0.45, 0.94],
							opacity: {
								duration: p.duration,
								delay: p.delay + p.duration * 0.4,
								ease: "easeIn",
							},
						}}
						onAnimationComplete={() => removeParticle(p.id)}
					/>
				))}
			</AnimatePresence>

			{/* Center the button */}
			<div className="flex h-full min-h-[500px] items-center justify-center">
				{/* The ref is attached via a wrapper span so Button can forward it */}
				<span ref={buttonRef as React.RefObject<HTMLSpanElement>} className="inline-block">
					<Button
						color="primary"
						variant="shadow"
						onPress={handleCelebrate}
						className="relative z-10 px-8 py-3 text-base font-semibold"
					>
						Celebrate!
					</Button>
				</span>
			</div>
		</div>
	);
}
