import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AnimatedNumber } from "./ui/animated-number";

const PRICE_PER_LITRE = 1.75;
const LITRE_INCREMENT = 0.1; // 100ml
const INTERVAL_MS = 100;

export function PetrolCounterDemo() {
	const [litres, setLitres] = useState(0);
	const [isActive, setIsActive] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Calculate price based on litres
	const price = litres * PRICE_PER_LITRE;

	// Start filling
	const startFilling = () => {
		setIsActive(true);
		intervalRef.current = setInterval(() => {
			setLitres((prev) => prev + LITRE_INCREMENT);
		}, INTERVAL_MS);
	};

	// Stop filling
	const stopFilling = () => {
		setIsActive(false);
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	// Reset counters
	const reset = () => {
		stopFilling();
		setLitres(0);
	};

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	return (
		<div className="flex min-h-[400px] items-center justify-center p-8">
			<div className="w-full max-w-2xl">
				{/* Petrol Pump Display */}
				<div className="mb-8 rounded-3xl border-2 border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 shadow-2xl">
					{/* Header */}
					<div className="mb-6 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
								<span className="text-2xl">⛽</span>
							</div>
							<div>
								<h2 className="font-bold text-white text-xl">Petrol Pump</h2>
								<p className="text-sm text-zinc-400">
									${PRICE_PER_LITRE.toFixed(2)}/L
								</p>
							</div>
						</div>
						{isActive && (
							<motion.div
								className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2"
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
							>
								<motion.div
									className="h-2 w-2 rounded-full bg-emerald-400"
									animate={{ opacity: [1, 0.3, 1] }}
									transition={{
										duration: 1,
										repeat: Number.POSITIVE_INFINITY,
										ease: "easeInOut",
									}}
								/>
								<span className="font-medium text-emerald-400 text-sm">
									Filling...
								</span>
							</motion.div>
						)}
					</div>

					{/* Counters */}
					<div className="grid grid-cols-2 gap-6">
						{/* Price Counter */}
						<div className="rounded-2xl border border-zinc-800 bg-black/40 p-6">
							<div className="mb-2 font-medium text-sm text-zinc-400">
								Total Price
							</div>
							<div className="font-bold font-mono text-4xl text-emerald-400">
								<AnimatedNumber
									value={price}
									decimals={2}
									prefix="$"
									minIntegerDigits={2}
								/>
							</div>
						</div>

						{/* Litres Counter */}
						<div className="rounded-2xl border border-zinc-800 bg-black/40 p-6">
							<div className="mb-2 font-medium text-sm text-zinc-400">
								Volume
							</div>
							<div className="font-bold font-mono text-4xl text-blue-400">
								<AnimatedNumber
									value={litres}
									decimals={2}
									suffix=" L"
									minIntegerDigits={2}
								/>
							</div>
						</div>
					</div>

					{/* Info */}
					<div className="mt-6 rounded-xl bg-zinc-800/50 p-4">
						<div className="grid grid-cols-2 gap-4 text-center text-sm">
							<div>
								<div className="text-zinc-400">Increment</div>
								<div className="font-medium text-white">
									{(LITRE_INCREMENT * 1000).toFixed(0)}ml / {INTERVAL_MS}ms
								</div>
							</div>
							<div>
								<div className="text-zinc-400">Rate</div>
								<div className="font-medium text-white">
									${PRICE_PER_LITRE.toFixed(2)}/L
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Controls */}
				<div className="flex flex-col items-center gap-4">
					<div className="flex gap-4">
						{/* Fill Button (Press & Hold) */}
						<motion.button
							type="button"
							onMouseDown={startFilling}
							onMouseUp={stopFilling}
							onMouseLeave={stopFilling}
							onTouchStart={startFilling}
							onTouchEnd={stopFilling}
							className={`rounded-2xl px-8 py-4 font-semibold text-lg transition-all ${
								isActive
									? "bg-emerald-500 text-white shadow-emerald-500/50 shadow-lg"
									: "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
							}`}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{isActive ? "Filling..." : "Hold to Fill"}
						</motion.button>

						{/* Reset Button */}
						<motion.button
							type="button"
							onClick={reset}
							className="rounded-2xl bg-zinc-800 px-8 py-4 font-semibold text-lg text-white transition-colors hover:bg-zinc-700"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Reset
						</motion.button>
					</div>

					<p className="text-center text-sm text-zinc-500">
						Press and hold the button to start filling. Release to stop.
					</p>
				</div>
			</div>
		</div>
	);
}
