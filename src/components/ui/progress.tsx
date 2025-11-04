import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

interface ProgressProps {
	value: number; // 0-100
	size?: "sm" | "md" | "lg";
	color?: string;
	showLabel?: boolean;
	className?: string;
}

/**
 * Linear Progress Bar
 */
export function LinearProgress({
	value,
	size = "md",
	color = "bg-primary",
	showLabel = false,
	className = "",
}: ProgressProps) {
	const heights = {
		sm: "h-1",
		md: "h-2",
		lg: "h-3",
	};

	const progress = useMotionValue(0);

	useEffect(() => {
		const controls = animate(progress, value, {
			duration: 0.5,
			ease: "easeOut",
		});
		return controls.stop;
	}, [value, progress]);

	return (
		<div className={`w-full ${className}`}>
			{showLabel && (
				<div className="mb-2 flex items-center justify-between text-sm">
					<span className="text-default-600">Progress</span>
					<motion.span className="font-medium text-default-900">
						{Math.round(value)}%
					</motion.span>
				</div>
			)}
			<div
				className={`w-full overflow-hidden rounded-full bg-default-200 ${heights[size]}`}
			>
				<motion.div
					className={`h-full rounded-full ${color}`}
					style={{
						width: useTransform(progress, (v) => `${v}%`),
					}}
					initial={{ width: 0 }}
				/>
			</div>
		</div>
	);
}

/**
 * Circular Progress
 */
export function CircularProgress({
	value,
	size = "md",
	color = "stroke-primary",
	showLabel = true,
	className = "",
}: ProgressProps) {
	const sizes = {
		sm: { dimension: 40, strokeWidth: 3 },
		md: { dimension: 60, strokeWidth: 4 },
		lg: { dimension: 80, strokeWidth: 5 },
	};

	const { dimension, strokeWidth } = sizes[size];
	const radius = (dimension - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;

	const progress = useMotionValue(0);
	const offset = useTransform(
		progress,
		(v) => circumference - (v / 100) * circumference,
	);

	useEffect(() => {
		const controls = animate(progress, value, {
			duration: 0.8,
			ease: "easeOut",
		});
		return controls.stop;
	}, [value, progress]);

	return (
		<div
			className={`relative ${className}`}
			style={{ width: dimension, height: dimension }}
		>
			<svg width={dimension} height={dimension} className="-rotate-90">
				{/* Background circle */}
				<circle
					cx={dimension / 2}
					cy={dimension / 2}
					r={radius}
					fill="none"
					stroke="currentColor"
					strokeWidth={strokeWidth}
					className="text-default-200"
				/>
				{/* Progress circle */}
				<motion.circle
					cx={dimension / 2}
					cy={dimension / 2}
					r={radius}
					fill="none"
					strokeWidth={strokeWidth}
					strokeLinecap="round"
					className={color}
					style={{
						strokeDasharray: circumference,
						strokeDashoffset: offset,
					}}
				/>
			</svg>
			{showLabel && (
				<motion.div className="absolute inset-0 flex items-center justify-center">
					<span className="font-semibold text-default-900 text-sm">
						{Math.round(value)}%
					</span>
				</motion.div>
			)}
		</div>
	);
}

/**
 * Indeterminate Linear Progress (loading bar)
 */
export function IndeterminateProgress({
	size = "md",
	color = "bg-primary",
	className = "",
}: Omit<ProgressProps, "value">) {
	const heights = {
		sm: "h-1",
		md: "h-2",
		lg: "h-3",
	};

	return (
		<div
			className={`w-full overflow-hidden rounded-full bg-default-200 ${heights[size]} ${className}`}
		>
			<motion.div
				className={`h-full rounded-full ${color}`}
				style={{ width: "40%" }}
				animate={{
					x: ["-100%", "250%"],
				}}
				transition={{
					duration: 1.5,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>
		</div>
	);
}

/**
 * Step Progress
 */
interface StepProgressProps {
	steps: string[];
	currentStep: number; // 0-based index
	className?: string;
}

export function StepProgress({
	steps,
	currentStep,
	className = "",
}: StepProgressProps) {
	return (
		<div className={`w-full ${className}`}>
			<div className="flex items-center justify-between">
				{steps.map((step, index) => {
					const isCompleted = index < currentStep;
					const isCurrent = index === currentStep;

					return (
						<div key={index} className="flex flex-1 items-center">
							{/* Step Circle */}
							<div className="relative flex flex-col items-center">
								<motion.div
									className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold text-sm ${
										isCompleted
											? "border-primary bg-primary text-primary-foreground"
											: isCurrent
												? "border-primary bg-background text-primary"
												: "border-default-300 bg-background text-default-400"
									}`}
									initial={false}
									animate={{
										scale: isCurrent ? 1.1 : 1,
									}}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 20,
									}}
								>
									{isCompleted ? (
										<svg
											className="h-5 w-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									) : (
										index + 1
									)}
								</motion.div>
								<span
									className={`mt-2 text-center text-xs ${
										isCurrent ? "font-medium text-primary" : "text-default-500"
									}`}
								>
									{step}
								</span>
							</div>

							{/* Connector Line */}
							{index < steps.length - 1 && (
								<div className="-mt-6 relative h-0.5 flex-1 bg-default-200">
									<motion.div
										className="h-full bg-primary"
										initial={{ width: "0%" }}
										animate={{
											width: isCompleted ? "100%" : "0%",
										}}
										transition={{
											duration: 0.5,
											ease: "easeOut",
										}}
									/>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

/**
 * Gradient Progress Bar
 */
export function GradientProgress({
	value,
	size = "md",
	showLabel = false,
	className = "",
}: Omit<ProgressProps, "color">) {
	const heights = {
		sm: "h-1",
		md: "h-2",
		lg: "h-3",
	};

	const progress = useMotionValue(0);

	useEffect(() => {
		const controls = animate(progress, value, {
			duration: 0.5,
			ease: "easeOut",
		});
		return controls.stop;
	}, [value, progress]);

	return (
		<div className={`w-full ${className}`}>
			{showLabel && (
				<div className="mb-2 flex items-center justify-between text-sm">
					<span className="text-default-600">Progress</span>
					<motion.span className="font-medium text-default-900">
						{Math.round(value)}%
					</motion.span>
				</div>
			)}
			<div
				className={`w-full overflow-hidden rounded-full bg-default-200 ${heights[size]}`}
			>
				<motion.div
					className="h-full rounded-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"
					style={{
						width: useTransform(progress, (v) => `${v}%`),
					}}
					initial={{ width: 0 }}
				/>
			</div>
		</div>
	);
}
