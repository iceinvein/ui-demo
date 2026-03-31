import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeftRight, Moon, Sun } from "lucide-react";
import { type PointerEvent, useRef, useState } from "react";

type ComparisonData = {
	label: string;
	before: { bg: string; elements: React.ReactNode };
	after: { bg: string; elements: React.ReactNode };
};

function DashboardBefore() {
	return (
		<div className="flex h-full w-full flex-col gap-3 bg-white p-5">
			{/* Old header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="h-6 w-6 rounded bg-gray-300" />
					<div className="h-3 w-20 rounded bg-gray-200" />
				</div>
				<div className="flex gap-2">
					<div className="h-6 w-14 rounded bg-gray-200" />
					<div className="h-6 w-14 rounded bg-gray-200" />
				</div>
			</div>
			{/* Old stats row */}
			<div className="grid grid-cols-3 gap-2">
				{["#e2e8f0", "#e2e8f0", "#e2e8f0"].map((bg, i) => (
					<div
						key={i}
						className="flex flex-col gap-1.5 rounded-lg border border-gray-200 p-3"
					>
						<div className="h-2 w-10 rounded bg-gray-300" />
						<div className="h-5 w-14 rounded" style={{ backgroundColor: bg }} />
						<div className="h-1.5 w-full rounded bg-gray-100" />
					</div>
				))}
			</div>
			{/* Old chart */}
			<div className="flex flex-1 flex-col gap-2 rounded-lg border border-gray-200 p-3">
				<div className="h-2 w-16 rounded bg-gray-200" />
				<div className="flex flex-1 items-end gap-1.5 pt-2">
					{[40, 65, 45, 80, 55, 70, 35, 60, 75, 50, 68, 42].map((h, i) => (
						<div
							key={i}
							className="flex-1 rounded-t bg-gray-200"
							style={{ height: `${h}%` }}
						/>
					))}
				</div>
			</div>
			{/* Old table */}
			<div className="space-y-1.5">
				{[0, 1, 2].map((i) => (
					<div key={i} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
						<div className="h-3 w-3 rounded-full bg-gray-200" />
						<div className="h-2 w-24 rounded bg-gray-200" />
						<div className="ml-auto h-2 w-12 rounded bg-gray-100" />
					</div>
				))}
			</div>
		</div>
	);
}

function DashboardAfter() {
	return (
		<div className="flex h-full w-full flex-col gap-3 bg-slate-950 p-5">
			{/* New header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="h-6 w-6 rounded bg-indigo-500" />
					<div className="h-3 w-20 rounded bg-slate-700" />
				</div>
				<div className="flex gap-2">
					<div className="h-6 w-14 rounded-lg bg-indigo-600" />
					<div className="h-6 w-14 rounded-lg bg-slate-800" />
				</div>
			</div>
			{/* New stats row */}
			<div className="grid grid-cols-3 gap-2">
				{["#818cf8", "#34d399", "#fbbf24"].map((accent, i) => (
					<div
						key={i}
						className="flex flex-col gap-1.5 rounded-xl border border-slate-800 bg-slate-900 p-3"
					>
						<div className="h-2 w-10 rounded bg-slate-700" />
						<div
							className="h-5 w-14 rounded"
							style={{ backgroundColor: accent, opacity: 0.8 }}
						/>
						<div className="h-1.5 w-full overflow-hidden rounded bg-slate-800">
							<div
								className="h-full rounded"
								style={{
									backgroundColor: accent,
									width: `${[72, 58, 85][i]}%`,
								}}
							/>
						</div>
					</div>
				))}
			</div>
			{/* New chart */}
			<div className="flex flex-1 flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900 p-3">
				<div className="h-2 w-16 rounded bg-slate-700" />
				<div className="flex flex-1 items-end gap-1.5 pt-2">
					{[40, 65, 45, 80, 55, 70, 35, 60, 75, 50, 68, 42].map((h, i) => (
						<div
							key={i}
							className="flex-1 rounded-t bg-gradient-to-t from-indigo-600 to-indigo-400"
							style={{ height: `${h}%` }}
						/>
					))}
				</div>
			</div>
			{/* New table */}
			<div className="space-y-1.5">
				{[
					{ color: "#818cf8" },
					{ color: "#34d399" },
					{ color: "#fbbf24" },
				].map((row, i) => (
					<div
						key={i}
						className="flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2"
					>
						<div
							className="h-3 w-3 rounded-full"
							style={{ backgroundColor: row.color }}
						/>
						<div className="h-2 w-24 rounded bg-slate-700" />
						<div className="ml-auto h-2 w-12 rounded bg-slate-800" />
					</div>
				))}
			</div>
		</div>
	);
}

const comparisons: ComparisonData[] = [
	{
		label: "Dashboard Redesign",
		before: { bg: "#ffffff", elements: <DashboardBefore /> },
		after: { bg: "#0f172a", elements: <DashboardAfter /> },
	},
];

function ComparisonSlider({
	data,
	height = 380,
}: {
	data: ComparisonData;
	height?: number;
}) {
	const containerRef = useRef<HTMLDivElement>(null);
	const x = useMotionValue(0.5);
	const clipRight = useTransform(x, (v) => `inset(0 0 0 ${v * 100}%)`);
	const [dragging, setDragging] = useState(false);

	const updatePosition = (clientX: number) => {
		const rect = containerRef.current?.getBoundingClientRect();
		if (!rect) return;
		const ratio = Math.max(0.02, Math.min(0.98, (clientX - rect.left) / rect.width));
		x.set(ratio);
	};

	const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
		setDragging(true);
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
		updatePosition(e.clientX);
	};

	const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
		if (!dragging) return;
		updatePosition(e.clientX);
	};

	const handlePointerUp = () => setDragging(false);

	return (
		<div
			ref={containerRef}
			className="relative w-full cursor-col-resize select-none overflow-hidden rounded-2xl border border-default-200/60"
			style={{ height }}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
		>
			{/* Before layer (full width, underneath) */}
			<div className="absolute inset-0">{data.before.elements}</div>

			{/* After layer (clipped) */}
			<motion.div className="absolute inset-0" style={{ clipPath: clipRight }}>
				{data.after.elements}
			</motion.div>

			{/* Divider line */}
			<motion.div
				className="pointer-events-none absolute top-0 bottom-0 z-10"
				style={{ left: useTransform(x, (v) => `${v * 100}%`) }}
			>
				<div className="-translate-x-1/2 relative h-full w-0.5 bg-white/80 shadow-sm shadow-black/20">
					{/* Handle grip */}
					<div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white shadow-lg">
						<ArrowLeftRight className="h-3.5 w-3.5 text-slate-600" />
					</div>
				</div>
			</motion.div>

			{/* Labels */}
			<div className="pointer-events-none absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
				<Sun className="h-3 w-3 text-amber-300" />
				<span className="font-medium text-white text-[10px]">Before</span>
			</div>
			<div className="pointer-events-none absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 backdrop-blur-sm">
				<Moon className="h-3 w-3 text-indigo-300" />
				<span className="font-medium text-white text-[10px]">After</span>
			</div>
		</div>
	);
}

export function BeforeAfterDemo() {
	const data = comparisons[0];

	return (
		<div className="flex min-h-[500px] flex-col items-center justify-center gap-8 p-8">
			{/* Header */}
			<motion.div
				className="flex flex-col items-center gap-2"
				initial={{ opacity: 0, y: -16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45 }}
			>
				<h2 className="font-bold text-2xl text-indigo-500">
					Before / After
				</h2>
				<p className="text-default-500 text-sm">
					Drag the divider to compare — {data.label}
				</p>
			</motion.div>

			{/* Comparison slider */}
			<motion.div
				className="w-full max-w-xl"
				initial={{ opacity: 0, scale: 0.97 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5, delay: 0.15 }}
			>
				<ComparisonSlider data={data} />
			</motion.div>

			{/* Hint */}
			<motion.div
				className="flex items-center gap-2 text-default-400 text-xs"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
			>
				<ArrowLeftRight className="h-3.5 w-3.5" />
				<span>Click and drag to compare</span>
			</motion.div>
		</div>
	);
}
