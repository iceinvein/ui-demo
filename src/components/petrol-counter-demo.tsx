"use client";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatedNumber } from "./ui/animated-number";

const PRICE_PER_LITRE = 1.75;
const LITRE_INCREMENT = 0.1; // 100ml
const DRAIN_INCREMENT = 0.2; // 200ml (faster drain)
const INTERVAL_MS = 100;
const TANK_SIZE = 50; // 50 litres max capacity

export function PetrolCounterDemo() {
	const [pumpLitres, setPumpLitres] = useState(0); // Total pumped (shown on pump display)
	const [tankLitres, setTankLitres] = useState(0); // Current fuel in tank
	const [isActive, setIsActive] = useState(false);
	const [isDraining, setIsDraining] = useState(false);
	const fillIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const drainIntervalRef = useRef<NodeJS.Timeout | null>(null);

	// Calculate price based on total pumped
	const price = pumpLitres * PRICE_PER_LITRE;

	// Calculate tank fill percentage
	const fillPercentage = Math.min((tankLitres / TANK_SIZE) * 100, 100);
	const isTankFull = tankLitres >= TANK_SIZE;

	// Start filling - increases both pump counter and tank level
	const startFilling = () => {
		if (isTankFull) return; // Don't fill if tank is full

		setIsActive(true);
		fillIntervalRef.current = setInterval(() => {
			setTankLitres((prev) => {
				const newValue = prev + LITRE_INCREMENT;
				if (newValue >= TANK_SIZE) {
					stopFilling(); // Auto-stop when tank full
					return TANK_SIZE;
				}
				return newValue;
			});
			setPumpLitres((prev) => prev + LITRE_INCREMENT);
		}, INTERVAL_MS);
	};

	// Stop filling
	const stopFilling = useCallback(() => {
		setIsActive(false);
		if (fillIntervalRef.current) {
			clearInterval(fillIntervalRef.current);
			fillIntervalRef.current = null;
		}
	}, []);

	// Stop draining
	const stopDraining = useCallback(() => {
		setIsDraining(false);
		if (drainIntervalRef.current) {
			clearInterval(drainIntervalRef.current);
			drainIntervalRef.current = null;
		}
	}, []);

	// Start draining - only drains tank, doesn't affect pump counter
	const startDraining = useCallback(() => {
		if (tankLitres <= 0) return; // Don't drain if empty

		setIsDraining(true);
		drainIntervalRef.current = setInterval(() => {
			setTankLitres((prev) => {
				const newValue = prev - DRAIN_INCREMENT;
				if (newValue <= 0) {
					stopDraining(); // Auto-stop when empty
					return 0;
				}
				return newValue;
			});
		}, INTERVAL_MS);
	}, [tankLitres, stopDraining]);

	// Reset - only resets pump counter, not tank level
	const reset = useCallback(() => {
		stopFilling();
		setPumpLitres(0);
	}, [stopFilling]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			stopFilling();
			stopDraining();
		};
	}, [stopDraining, stopFilling]);

	return (
		<div className="flex min-h-[600px] items-center justify-center p-8">
			<div className="w-full max-w-6xl">
				{/* Two Column Layout */}
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					{/* LEFT: Petrol Pump Station */}
					<div className="flex flex-col gap-6">
						{/* Pump Display */}
						<div className="flex-1 rounded-3xl border-2 border-zinc-800 bg-linear-to-br from-zinc-900 to-zinc-950 p-8 shadow-2xl">
							{/* Header */}
							<div className="mb-6 flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
										<span className="text-2xl">⛽</span>
									</div>
									<div>
										<h2 className="font-bold text-white text-xl">
											Petrol Pump
										</h2>
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
											{isTankFull ? "Tank Full!" : "Filling..."}
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
										Volume Pumped
									</div>
									<div className="font-bold font-mono text-4xl text-blue-400">
										<AnimatedNumber
											value={pumpLitres}
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
										<div className="text-zinc-400">Tank Size</div>
										<div className="font-medium text-white">{TANK_SIZE}L</div>
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

						{/* Pump Controls */}
						<div className="flex gap-4">
							{/* Fill Button (Press & Hold) */}
							<motion.button
								type="button"
								onMouseDown={startFilling}
								onMouseUp={stopFilling}
								onMouseLeave={stopFilling}
								onTouchStart={startFilling}
								onTouchEnd={stopFilling}
								disabled={isTankFull}
								className={`relative flex-1 overflow-hidden rounded-2xl px-8 py-4 font-semibold text-lg transition-all ${
									isActive
										? "bg-emerald-500 text-white shadow-emerald-500/50 shadow-lg"
										: isTankFull
											? "cursor-not-allowed bg-zinc-800 text-zinc-600"
											: "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
								}`}
								whileHover={!isTankFull ? { scale: 1.05 } : {}}
								whileTap={!isTankFull ? { scale: 0.95 } : {}}
							>
								{/* Liquid fill animation when active */}
								{isActive && (
									<>
										{/* Base liquid layer with overflow for waves */}
										<motion.div
											className="absolute inset-x-0 bottom-0 overflow-hidden bg-emerald-500/40"
											initial={{ height: "0%" }}
											animate={{ height: "100%" }}
											transition={{
												duration: 2,
												repeat: Number.POSITIVE_INFINITY,
												ease: "linear",
											}}
										>
											{/* Wave layer 1 - creates wavy top edge */}
											<motion.div
												className="-top-4 absolute inset-x-0 h-8 bg-emerald-400/60"
												style={{
													borderRadius: "50%",
												}}
												animate={{
													x: ["-25%", "25%", "-25%"],
													scaleX: [1, 1.2, 1],
													scaleY: [1, 0.8, 1],
												}}
												transition={{
													duration: 2,
													repeat: Number.POSITIVE_INFINITY,
													ease: "easeInOut",
												}}
											/>

											{/* Wave layer 2 - offset wave for more organic feel */}
											<motion.div
												className="-top-3 absolute inset-x-0 h-6 bg-emerald-300/40"
												style={{
													borderRadius: "50%",
												}}
												animate={{
													x: ["25%", "-25%", "25%"],
													scaleX: [1.2, 1, 1.2],
													scaleY: [0.8, 1, 0.8],
												}}
												transition={{
													duration: 1.5,
													repeat: Number.POSITIVE_INFINITY,
													ease: "easeInOut",
												}}
											/>
										</motion.div>

										{/* Shimmer overlay */}
										<motion.div
											className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
											animate={{
												x: ["-100%", "200%"],
											}}
											transition={{
												duration: 2.5,
												repeat: Number.POSITIVE_INFINITY,
												ease: "linear",
											}}
										/>

										{/* Bubbles */}
										{[...Array(5)].map((_, i) => (
											<motion.div
												key={`bubble-${i}`}
												className="absolute h-2 w-2 rounded-full bg-white/50 blur-[1px]"
												style={{
													left: `${20 + i * 15}%`,
													bottom: 0,
												}}
												animate={{
													y: [0, -80],
													opacity: [0, 1, 0],
													scale: [0.5, 1, 0.5],
												}}
												transition={{
													duration: 2,
													repeat: Number.POSITIVE_INFINITY,
													delay: i * 0.3,
													ease: "easeOut",
												}}
											/>
										))}
									</>
								)}

								<span className="relative z-10">
									{isTankFull
										? "Tank Full"
										: isActive
											? "Filling..."
											: "Hold to Fill"}
								</span>
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
					</div>

					{/* RIGHT: Car Tank */}
					<div className="flex flex-col items-center justify-center gap-6">
						{/* Tank Visualization */}
						<div>
							<div className="mb-3 text-center">
								<div className="font-medium text-sm text-zinc-400">
									Fuel Tank
								</div>
								<div className="font-mono text-lg text-white">
									<AnimatedNumber
										value={tankLitres}
										decimals={1}
										minIntegerDigits={2}
									/>{" "}
									/ {TANK_SIZE.toFixed(1)} L
								</div>
							</div>

							{/* Tank Container */}
							<div className="relative mx-auto h-80 w-40 overflow-hidden rounded-3xl border-2 border-zinc-700 bg-zinc-900/50 shadow-inner">
								{/* Liquid Fill */}
								<motion.div
									className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-blue-500 via-blue-400 to-blue-300"
									animate={{
										height: `${fillPercentage}%`,
									}}
									transition={{
										type: "spring",
										stiffness: 100,
										damping: 20,
									}}
								>
									{/* Animated wave effect on top */}
									<motion.div
										className="absolute top-0 right-0 left-0 h-8 bg-linear-to-b from-blue-300/50 to-transparent"
										animate={{
											x: ["-100%", "100%"],
										}}
										transition={{
											duration: 2,
											repeat: Number.POSITIVE_INFINITY,
											ease: "linear",
										}}
									/>

									{/* Shimmer effect */}
									<motion.div
										className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
										animate={{
											x: ["-100%", "200%"],
										}}
										transition={{
											duration: 3,
											repeat: Number.POSITIVE_INFINITY,
											ease: "easeInOut",
										}}
									/>
								</motion.div>

								{/* Tank level markers */}
								{[25, 50, 75].map((level) => (
									<div
										key={level}
										className="absolute right-0 left-0 border-zinc-700 border-t border-dashed"
										style={{ bottom: `${level}%` }}
									>
										<span className="-translate-y-1/2 absolute right-2 font-mono text-[10px] text-zinc-600">
											{(TANK_SIZE * (level / 100)).toFixed(0)}L
										</span>
									</div>
								))}

								{/* Full indicator */}
								{isTankFull && (
									<motion.div
										className="absolute inset-0 flex items-center justify-center bg-emerald-500/20"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.3 }}
									>
										<span className="font-bold text-emerald-400 text-xs">
											FULL
										</span>
									</motion.div>
								)}
							</div>
						</div>

						{/* Gas Pedal Button (Drain) */}
						<div className="flex flex-col items-center gap-2">
							<motion.button
								type="button"
								onMouseDown={startDraining}
								onMouseUp={stopDraining}
								onMouseLeave={stopDraining}
								onTouchStart={startDraining}
								onTouchEnd={stopDraining}
								disabled={tankLitres <= 0}
								className={`relative overflow-hidden rounded-full px-12 py-6 font-bold text-xl transition-all ${
									isDraining
										? "bg-orange-500 text-white shadow-lg shadow-orange-500/50"
										: tankLitres <= 0
											? "cursor-not-allowed bg-zinc-800 text-zinc-600"
											: "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
								}`}
								whileHover={tankLitres > 0 ? { scale: 1.05 } : {}}
								whileTap={tankLitres > 0 ? { scale: 0.95 } : {}}
								animate={
									isDraining
										? {
												y: [0, 2, 0],
												rotate: [0, -0.5, 0.5, 0],
											}
										: {}
								}
								transition={
									isDraining
										? {
												duration: 0.15,
												repeat: Number.POSITIVE_INFINITY,
												ease: "easeInOut",
											}
										: {}
								}
							>
								{/* Speed lines when active */}
								{isDraining && (
									[...Array(6)].map((_, i) => (
											<motion.div
												key={`speed-${i}`}
												className="absolute h-0.5 bg-white/40"
												style={{
													top: `${20 + i * 12}%`,
													right: "100%",
													width: `${30 + i * 10}px`,
												}}
												animate={{
													x: ["0%", "400%"],
													opacity: [0, 1, 0],
												}}
												transition={{
													duration: 0.8,
													repeat: Number.POSITIVE_INFINITY,
													delay: i * 0.1,
													ease: "easeOut",
												}}
											/>
										))
								)}

								{/* Animated background when active */}
								{isDraining && (
									<motion.div
										className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
										animate={{
											x: ["-100%", "200%"],
										}}
										transition={{
											duration: 1,
											repeat: Number.POSITIVE_INFINITY,
											ease: "linear",
										}}
									/>
								)}

								{/* Pedal Icon */}
								<motion.div
									className="relative z-10 flex items-center gap-3"
									animate={
										isDraining
											? {
													x: [0, -2, 2, 0],
												}
											: {}
									}
									transition={
										isDraining
											? {
													duration: 0.2,
													repeat: Number.POSITIVE_INFINITY,
													ease: "easeInOut",
												}
											: {}
									}
								>
									<motion.span
										className="text-2xl"
										animate={
											isDraining
												? {
														rotate: [0, -5, 5, 0],
													}
												: {}
										}
										transition={
											isDraining
												? {
														duration: 0.3,
														repeat: Number.POSITIVE_INFINITY,
														ease: "easeInOut",
													}
												: {}
										}
									>
										🚗
									</motion.span>
									<span>{isDraining ? "Driving..." : "Gas Pedal"}</span>
								</motion.div>
							</motion.button>
							<p className="text-center text-xs text-zinc-500">
								Hold to drain fuel (simulates driving)
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
