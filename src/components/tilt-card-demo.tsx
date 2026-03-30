import {
	motion,
	useSpring,
	useTransform,
	type MotionValue,
} from "framer-motion";
import {
	ExternalLink,
	GitBranch,
	Globe,
	Star,
	TrendingUp,
	Zap,
} from "lucide-react";
import { useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SPRING_CONFIG = { stiffness: 300, damping: 30, mass: 0.5 };
const MAX_ROTATION = 15;

// ---------------------------------------------------------------------------
// useTilt hook
// ---------------------------------------------------------------------------

type TiltState = { rotateX: number; rotateY: number; nx: number; ny: number };
const RESET: TiltState = { rotateX: 0, rotateY: 0, nx: 0.5, ny: 0.5 };

function useTilt() {
	const cardRef = useRef<HTMLDivElement>(null);
	const [tilt, setTilt] = useState<TiltState>(RESET);

	// Spring-smoothed rotation values
	const rotateX = useSpring(tilt.rotateX, SPRING_CONFIG);
	const rotateY = useSpring(tilt.rotateY, SPRING_CONFIG);

	// Spring-smoothed normalised cursor position (0–1) for the shine
	const shineNx = useSpring(tilt.nx, SPRING_CONFIG);
	const shineNy = useSpring(tilt.ny, SPRING_CONFIG);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const card = cardRef.current;
		if (!card) return;

		const rect = card.getBoundingClientRect();
		// Normalised: 0 = left/top edge, 1 = right/bottom edge
		const nx = (e.clientX - rect.left) / rect.width;
		const ny = (e.clientY - rect.top) / rect.height;

		// rotateX: negative at top (tilt top toward viewer), positive at bottom
		// rotateY: negative at left, positive at right
		setTilt({
			rotateX: -(ny - 0.5) * 2 * MAX_ROTATION,
			rotateY: (nx - 0.5) * 2 * MAX_ROTATION,
			nx,
			ny,
		});
	};

	const handleMouseLeave = () => setTilt(RESET);

	return {
		cardRef,
		rotateX,
		rotateY,
		shineNx,
		shineNy,
		handleMouseMove,
		handleMouseLeave,
	};
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ShineOverlay({
	nx,
	ny,
}: {
	nx: MotionValue<number>;
	ny: MotionValue<number>;
}) {
	const background = useTransform([nx, ny] as const, ([x, y]: number[]) => {
		const px = Math.round(x * 100);
		const py = Math.round(y * 100);
		return `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.85) 0%, transparent 65%)`;
	});

	return (
		<motion.div
			className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
			style={{ background, opacity: 0.2 }}
		/>
	);
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const STATS = [
	{ label: "Stars", value: "12.4k", Icon: Star, color: "text-amber-500" },
	{ label: "Forks", value: "2.1k", Icon: TrendingUp, color: "text-sky-500" },
	{ label: "Speed", value: "98ms", Icon: Zap, color: "text-violet-500" },
] as const;

const TAGS = ["TypeScript", "React 19", "Framer Motion", "Tailwind"] as const;

const AVATARS = [
	{
		initials: "AD",
		bg: "linear-gradient(135deg,#6d28d9,#4f46e5)",
	},
	{
		initials: "BK",
		bg: "linear-gradient(135deg,#0ea5e9,#6366f1)",
	},
	{
		initials: "CR",
		bg: "linear-gradient(135deg,#10b981,#0ea5e9)",
	},
	{
		initials: "D+",
		bg: "linear-gradient(135deg,#f59e0b,#ef4444)",
	},
] as const;

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function TiltCardDemo() {
	const {
		cardRef,
		rotateX,
		rotateY,
		shineNx,
		shineNy,
		handleMouseMove,
		handleMouseLeave,
	} = useTilt();

	return (
		<div className="relative flex min-h-[500px] items-center justify-center p-8">
			{/* Perspective wrapper — must be a plain div, NOT the motion element */}
			<div style={{ perspective: "900px" }}>
				<motion.div
					ref={cardRef}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					style={{
						rotateX,
						rotateY,
						transformStyle: "preserve-3d",
					}}
					className="relative w-[340px] cursor-pointer select-none rounded-2xl border border-default-200 bg-default-50 shadow-2xl"
				>
					{/* Moving shine / glare */}
					<ShineOverlay nx={shineNx} ny={shineNy} />

					{/* ── Header gradient band ── */}
					<div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 px-6 pt-8 pb-6">
						{/* Decorative background circles */}
						<div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10" />
						<div className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-white/10" />

						{/* Status badge — lifts slightly in Z */}
						<div
							className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-white/90 text-xs backdrop-blur-sm"
							style={{ transform: "translateZ(24px)" }}
						>
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
							Open Source
						</div>

						<h2
							className="mb-1 font-bold text-2xl text-white leading-tight"
							style={{ transform: "translateZ(16px)" }}
						>
							Velocity UI Kit
						</h2>
						<p
							className="text-sm text-white/75 leading-relaxed"
							style={{ transform: "translateZ(8px)" }}
						>
							Production-ready components for modern React apps. Zero-config,
							fully typed, ridiculously fast.
						</p>
					</div>

					{/* ── Card body ── */}
					<div className="p-6">
						{/* Stats row */}
						<div className="mb-5 grid grid-cols-3 gap-3">
							{STATS.map(({ label, value, Icon, color }) => (
								<div
									key={label}
									className="flex flex-col items-center rounded-xl border border-default-100 bg-default-100/60 px-2 py-3"
								>
									<Icon className={`mb-1 h-4 w-4 ${color}`} />
									<span className="font-bold text-default-900 text-sm">
										{value}
									</span>
									<span className="text-default-500 text-xs">{label}</span>
								</div>
							))}
						</div>

						{/* Tag pills */}
						<div className="mb-5 flex flex-wrap gap-2">
							{TAGS.map((tag) => (
								<span
									key={tag}
									className="rounded-full bg-default-100 px-3 py-1 text-default-600 text-xs"
								>
									{tag}
								</span>
							))}
						</div>

						<div className="mb-5 h-px bg-default-100" />

						{/* Footer: avatars + action buttons */}
						<div className="flex items-center justify-between">
							{/* Avatar stack */}
							<div className="flex -space-x-2">
								{AVATARS.map(({ initials, bg }) => (
									<div
										key={initials}
										className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-default-50 text-white text-xs font-semibold shadow-sm"
										style={{ background: bg }}
									>
										{initials}
									</div>
								))}
							</div>

							{/* Buttons */}
							<div className="flex items-center gap-2">
								<motion.button
									type="button"
									className="flex items-center gap-1.5 rounded-lg border border-default-200 bg-default-100 px-3 py-1.5 text-default-700 text-xs font-medium"
									whileHover={{ scale: 1.04 }}
									whileTap={{ scale: 0.96 }}
								>
									<GitBranch className="h-3.5 w-3.5" />
									GitHub
								</motion.button>
								<motion.button
									type="button"
									className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1.5 text-white text-xs font-medium shadow-sm"
									whileHover={{ scale: 1.04 }}
									whileTap={{ scale: 0.96 }}
								>
									<Globe className="h-3.5 w-3.5" />
									Docs
									<ExternalLink className="h-3 w-3 opacity-70" />
								</motion.button>
							</div>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Hint label */}
			<motion.p
				className="absolute bottom-4 text-center text-default-400 text-xs"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
			>
				Move your cursor over the card
			</motion.p>
		</div>
	);
}
