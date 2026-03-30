import {
	type MotionValue,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from "framer-motion";
import {
	ExternalLink,
	GitBranch,
	Globe,
	Star,
	TrendingUp,
	Zap,
} from "lucide-react";
import { useRef } from "react";

const SPRING_CONFIG = { stiffness: 300, damping: 30, mass: 0.5 };
const MAX_ROTATION = 15;

function useTilt() {
	const cardRef = useRef<HTMLDivElement>(null);

	const rawRotateX = useMotionValue(0);
	const rawRotateY = useMotionValue(0);
	const rawShineX = useMotionValue(0.5);
	const rawShineY = useMotionValue(0.5);

	const rotateX = useSpring(rawRotateX, SPRING_CONFIG);
	const rotateY = useSpring(rawRotateY, SPRING_CONFIG);
	const shineNx = useSpring(rawShineX, SPRING_CONFIG);
	const shineNy = useSpring(rawShineY, SPRING_CONFIG);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const card = cardRef.current;
		if (!card) return;
		const rect = card.getBoundingClientRect();
		const nx = (e.clientX - rect.left) / rect.width;
		const ny = (e.clientY - rect.top) / rect.height;
		rawRotateX.set(-(ny - 0.5) * 2 * MAX_ROTATION);
		rawRotateY.set((nx - 0.5) * 2 * MAX_ROTATION);
		rawShineX.set(nx);
		rawShineY.set(ny);
	};

	const handleMouseLeave = () => {
		rawRotateX.set(0);
		rawRotateY.set(0);
		rawShineX.set(0.5);
		rawShineY.set(0.5);
	};

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
						<div className="-top-8 -right-8 pointer-events-none absolute h-32 w-32 rounded-full bg-white/10" />
						<div className="-bottom-4 -left-4 pointer-events-none absolute h-20 w-20 rounded-full bg-white/10" />

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
							<div className="-space-x-2 flex">
								{AVATARS.map(({ initials, bg }) => (
									<div
										key={initials}
										className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-default-50 font-semibold text-white text-xs shadow-sm"
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
									className="flex items-center gap-1.5 rounded-lg border border-default-200 bg-default-100 px-3 py-1.5 font-medium text-default-700 text-xs"
									whileHover={{ scale: 1.04 }}
									whileTap={{ scale: 0.96 }}
								>
									<GitBranch className="h-3.5 w-3.5" />
									GitHub
								</motion.button>
								<motion.button
									type="button"
									className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1.5 font-medium text-white text-xs shadow-sm"
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
