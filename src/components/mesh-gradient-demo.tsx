import { motion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useState } from "react";

type Blob = {
	color: string;
	size: string;
	position: string;
	animation: {
		x: number[];
		y: number[];
		scale: number[];
	};
	duration: number;
};

const PRESETS: Record<string, Blob[]> = {
	aurora: [
		{
			color: "bg-emerald-400",
			size: "w-[500px] h-[500px]",
			position: "top-[-20%] left-[-10%]",
			animation: { x: [0, 120, -40, 0], y: [0, 60, -80, 0], scale: [1, 1.2, 0.9, 1] },
			duration: 14,
		},
		{
			color: "bg-cyan-400",
			size: "w-[450px] h-[450px]",
			position: "top-[10%] right-[-15%]",
			animation: { x: [0, -80, 60, 0], y: [0, 100, -20, 0], scale: [1, 0.8, 1.15, 1] },
			duration: 18,
		},
		{
			color: "bg-teal-300",
			size: "w-[400px] h-[400px]",
			position: "bottom-[-10%] left-[20%]",
			animation: { x: [0, 80, -60, 0], y: [0, -60, 40, 0], scale: [1, 1.1, 0.85, 1] },
			duration: 16,
		},
		{
			color: "bg-green-500",
			size: "w-[350px] h-[350px]",
			position: "bottom-[10%] right-[10%]",
			animation: { x: [0, -40, 100, 0], y: [0, 80, -40, 0], scale: [0.9, 1.2, 1, 0.9] },
			duration: 20,
		},
	],
	sunset: [
		{
			color: "bg-orange-500",
			size: "w-[500px] h-[500px]",
			position: "top-[-15%] left-[-5%]",
			animation: { x: [0, 60, -80, 0], y: [0, 40, -60, 0], scale: [1, 1.15, 0.9, 1] },
			duration: 15,
		},
		{
			color: "bg-rose-500",
			size: "w-[420px] h-[420px]",
			position: "top-[20%] right-[-10%]",
			animation: { x: [0, -100, 40, 0], y: [0, -40, 80, 0], scale: [1, 0.85, 1.2, 1] },
			duration: 17,
		},
		{
			color: "bg-pink-400",
			size: "w-[380px] h-[380px]",
			position: "bottom-[-5%] left-[15%]",
			animation: { x: [0, 90, -50, 0], y: [0, -70, 30, 0], scale: [1, 1.1, 0.95, 1] },
			duration: 19,
		},
		{
			color: "bg-amber-400",
			size: "w-[340px] h-[340px]",
			position: "bottom-[15%] right-[5%]",
			animation: { x: [0, -60, 70, 0], y: [0, 50, -90, 0], scale: [0.95, 1.15, 1, 0.95] },
			duration: 13,
		},
	],
	nebula: [
		{
			color: "bg-violet-600",
			size: "w-[480px] h-[480px]",
			position: "top-[-10%] left-[5%]",
			animation: { x: [0, 70, -90, 0], y: [0, -50, 70, 0], scale: [1, 1.2, 0.85, 1] },
			duration: 16,
		},
		{
			color: "bg-indigo-500",
			size: "w-[440px] h-[440px]",
			position: "top-[15%] right-[-5%]",
			animation: { x: [0, -80, 50, 0], y: [0, 60, -80, 0], scale: [1, 0.9, 1.15, 1] },
			duration: 20,
		},
		{
			color: "bg-purple-400",
			size: "w-[360px] h-[360px]",
			position: "bottom-[5%] left-[-10%]",
			animation: { x: [0, 100, -30, 0], y: [0, -40, 60, 0], scale: [0.9, 1.1, 1, 0.9] },
			duration: 14,
		},
		{
			color: "bg-blue-500",
			size: "w-[320px] h-[320px]",
			position: "bottom-[-5%] right-[15%]",
			animation: { x: [0, -50, 80, 0], y: [0, 90, -50, 0], scale: [1, 1.15, 0.9, 1] },
			duration: 18,
		},
	],
	ocean: [
		{
			color: "bg-blue-500",
			size: "w-[500px] h-[500px]",
			position: "top-[-15%] left-[-10%]",
			animation: { x: [0, 80, -60, 0], y: [0, 50, -70, 0], scale: [1, 1.2, 0.9, 1] },
			duration: 17,
		},
		{
			color: "bg-sky-400",
			size: "w-[430px] h-[430px]",
			position: "top-[10%] right-[-10%]",
			animation: { x: [0, -70, 90, 0], y: [0, -60, 40, 0], scale: [1, 0.85, 1.15, 1] },
			duration: 15,
		},
		{
			color: "bg-cyan-500",
			size: "w-[370px] h-[370px]",
			position: "bottom-[-10%] left-[10%]",
			animation: { x: [0, 60, -80, 0], y: [0, 70, -30, 0], scale: [1, 1.1, 0.95, 1] },
			duration: 19,
		},
		{
			color: "bg-teal-400",
			size: "w-[310px] h-[310px]",
			position: "bottom-[10%] right-[10%]",
			animation: { x: [0, -90, 40, 0], y: [0, -30, 80, 0], scale: [0.95, 1.2, 1, 0.95] },
			duration: 13,
		},
	],
};

const presetNames = Object.keys(PRESETS) as (keyof typeof PRESETS)[];

export function MeshGradientDemo() {
	const [preset, setPreset] = useState<keyof typeof PRESETS>("aurora");
	const [paused, setPaused] = useState(false);
	const [key, setKey] = useState(0);

	const blobs = PRESETS[preset];

	return (
		<div className="flex min-h-[500px] flex-col items-center justify-center gap-8 p-8">
			{/* Header */}
			<motion.div
				className="flex flex-col items-center gap-2"
				initial={{ opacity: 0, y: -16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45 }}
			>
				<h2 className="font-bold text-2xl text-teal-500">
					Mesh Gradient
				</h2>
				<p className="text-default-500 text-sm">
					Switch presets to see different color moods
				</p>
			</motion.div>

			{/* Gradient viewport */}
			<motion.div
				className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-default-200/60"
				style={{ height: 350 }}
				initial={{ opacity: 0, scale: 0.97 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.15 }}
			>
				{/* Dark base */}
				<div className="absolute inset-0 bg-slate-950" />

				{/* Animated blobs */}
				{blobs.map((blob, i) => (
					<motion.div
						key={`${preset}-${i}-${key}`}
						className={`absolute rounded-full opacity-60 ${blob.color} ${blob.size} ${blob.position}`}
						style={{ filter: "blur(80px)" }}
						animate={
							paused
								? {}
								: {
										x: blob.animation.x,
										y: blob.animation.y,
										scale: blob.animation.scale,
									}
						}
						transition={{
							duration: blob.duration,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
				))}

				{/* Subtle noise overlay */}
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.15]"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
						backgroundSize: "128px 128px",
					}}
				/>

				{/* Center label */}
				<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
					<motion.span
						className="font-semibold text-white/80 text-lg capitalize tracking-wide"
						key={preset}
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
					>
						{preset}
					</motion.span>
					<span className="mt-1 text-white/40 text-xs">
						{paused ? "Paused" : "Animating"}
					</span>
				</div>
			</motion.div>

			{/* Controls */}
			<motion.div
				className="flex flex-wrap items-center justify-center gap-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				{/* Preset pills */}
				<div className="flex gap-2">
					{presetNames.map((name) => (
						<button
							key={name}
							type="button"
							onClick={() => {
								setPreset(name);
								setKey((k) => k + 1);
							}}
							className={`rounded-full border px-3 py-1 font-mono text-xs capitalize transition-all ${
								name === preset
									? "border-teal-500/40 bg-teal-500/8 text-teal-500"
									: "border-default-200/60 text-default-500 hover:border-default-300 hover:text-default-700"
							}`}
						>
							{name}
						</button>
					))}
				</div>

				{/* Play / Pause / Reset */}
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => setPaused((p) => !p)}
						className="flex items-center gap-1.5 rounded-full border border-default-200 bg-default-100 px-3 py-1 text-default-700 text-xs transition-colors hover:bg-default-200"
					>
						{paused ? (
							<Play className="h-3 w-3" />
						) : (
							<Pause className="h-3 w-3" />
						)}
						{paused ? "Play" : "Pause"}
					</button>
					<button
						type="button"
						onClick={() => setKey((k) => k + 1)}
						className="flex items-center gap-1.5 rounded-full border border-default-200 bg-default-100 px-3 py-1 text-default-700 text-xs transition-colors hover:bg-default-200"
					>
						<RotateCcw className="h-3 w-3" />
						Reset
					</button>
				</div>
			</motion.div>
		</div>
	);
}
