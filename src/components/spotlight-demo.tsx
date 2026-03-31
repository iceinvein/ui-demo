import { motion } from "framer-motion";
import {
	Code2,
	Eye,
	Fingerprint,
	Layers,
	Lock,
	Scan,
	Shield,
	Sparkles,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

export function SpotlightDemo() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
	const [isInside, setIsInside] = useState(false);
	const [radius, setRadius] = useState(120);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const rect = containerRef.current?.getBoundingClientRect();
			if (!rect) return;
			setMouse({
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
			});
		},
		[],
	);

	return (
		<div className="flex min-h-[500px] flex-col items-center justify-center gap-8 p-8">
			{/* Header */}
			<motion.div
				className="flex flex-col items-center gap-2"
				initial={{ opacity: 0, y: -16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45 }}
			>
				<h2 className="font-bold text-2xl text-amber-500">
					Spotlight Reveal
				</h2>
				<p className="text-default-500 text-sm">
					Move your cursor to illuminate the hidden content
				</p>
			</motion.div>

			{/* Spotlight container */}
			<motion.div
				ref={containerRef}
				className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-default-200/60"
				style={{ height: 400 }}
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setIsInside(true)}
				onMouseLeave={() => setIsInside(false)}
				initial={{ opacity: 0, scale: 0.97 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.15 }}
			>
				{/* Hidden content layer — always rendered, revealed by mask */}
				<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
					{/* Grid of "secret" content */}
					<div className="grid h-full grid-cols-2 gap-4 md:grid-cols-4">
						{[
							{ icon: Shield, label: "Protected", color: "#22c55e" },
							{ icon: Lock, label: "Encrypted", color: "#3b82f6" },
							{ icon: Fingerprint, label: "Biometric", color: "#a855f7" },
							{ icon: Eye, label: "Monitored", color: "#ef4444" },
							{ icon: Scan, label: "Scanning", color: "#f59e0b" },
							{ icon: Code2, label: "Encoded", color: "#06b6d4" },
							{ icon: Layers, label: "Layered", color: "#ec4899" },
							{ icon: Sparkles, label: "Verified", color: "#10b981" },
						].map((item) => (
							<div
								key={item.label}
								className="flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
							>
								<item.icon
									className="h-8 w-8"
									style={{ color: item.color }}
								/>
								<span className="font-mono text-white/80 text-xs">
									{item.label}
								</span>
							</div>
						))}
					</div>

					{/* Decorative scan lines */}
					<div
						className="pointer-events-none absolute inset-0 opacity-[0.03]"
						style={{
							backgroundImage:
								"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
						}}
					/>
				</div>

				{/* Dark overlay with radial mask cutout */}
				<div
					className="pointer-events-none absolute inset-0 transition-opacity duration-300"
					style={{
						background: isInside
							? `radial-gradient(circle ${radius}px at ${mouse.x}px ${mouse.y}px, transparent 0%, rgba(0,0,0,0.85) 100%)`
							: "rgba(0,0,0,0.85)",
					}}
				/>

				{/* Spotlight ring glow */}
				{isInside && (
					<div
						className="pointer-events-none absolute"
						style={{
							left: mouse.x - radius,
							top: mouse.y - radius,
							width: radius * 2,
							height: radius * 2,
							borderRadius: "50%",
							boxShadow: `0 0 40px 10px rgba(251,191,36,0.15), inset 0 0 30px 5px rgba(251,191,36,0.08)`,
						}}
					/>
				)}

				{/* Idle prompt */}
				<motion.div
					className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3"
					animate={{ opacity: isInside ? 0 : 1 }}
					transition={{ duration: 0.3 }}
				>
					<motion.div
						animate={{
							scale: [1, 1.2, 1],
							opacity: [0.4, 0.8, 0.4],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					>
						<Eye className="h-10 w-10 text-amber-400/60" />
					</motion.div>
					<p className="font-mono text-amber-400/50 text-sm">
						Move cursor to reveal
					</p>
				</motion.div>
			</motion.div>

			{/* Radius control */}
			<motion.div
				className="flex items-center gap-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				<label className="font-mono text-default-500 text-xs" htmlFor="radius-slider">
					Spotlight size
				</label>
				<input
					id="radius-slider"
					type="range"
					min={60}
					max={250}
					value={radius}
					onChange={(e) => setRadius(Number(e.target.value))}
					className="h-1.5 w-32 accent-amber-500"
				/>
				<span className="w-10 font-mono text-default-400 text-xs">
					{radius}px
				</span>
			</motion.div>
		</div>
	);
}
