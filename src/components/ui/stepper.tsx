import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export interface Step {
	label: string;
	description?: string;
	icon?: ReactNode;
}

interface StepperProps {
	steps: Step[];
	currentStep: number;
	onStepClick?: (index: number) => void;
	className?: string;
}

/**
 * Neon Glow Stepper - Cyberpunk-style with animated neon glows and path drawing checkmarks
 */
export function NeonGlowStepper({
	steps,
	currentStep,
	onStepClick,
	className = "",
}: StepperProps) {
	const isClickable = !!onStepClick;
	const [prevStep, setPrevStep] = useState(currentStep);

	// Track when step changes to trigger sequential animations
	useEffect(() => {
		setPrevStep(currentStep);
	}, [currentStep]);

	return (
		<div
			className={`relative w-full overflow-hidden rounded-2xl border border-primary/20 bg-black/40 p-8 backdrop-blur-md ${className}`}
		>
			{/* Animated scanlines */}
			<motion.div
				className="pointer-events-none absolute inset-0 opacity-10"
				style={{
					backgroundImage:
						"repeating-linear-gradient(0deg, transparent, transparent 2px, #006FEE 2px, #006FEE 4px)",
				}}
				animate={{ y: [0, 20, 0] }}
				transition={{
					duration: 3,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				}}
			/>

			{/* Grid background */}
			<div
				className="pointer-events-none absolute inset-0 opacity-5"
				style={{
					backgroundImage:
						"linear-gradient(#006FEE 1px, transparent 1px), linear-gradient(90deg, #006FEE 1px, transparent 1px)",
					backgroundSize: "50px 50px",
				}}
			/>

			<div className="relative flex items-center justify-between">
				{steps.map((step, index) => {
					const isCompleted = index < currentStep;
					const isCurrent = index === currentStep;
					const isClickableStep =
						isClickable && (isCompleted || index <= currentStep + 1);

					// Calculate animation delay: connector takes 0.6s, so step animates after
					const wasJustCompleted =
						index === currentStep - 1 && currentStep > prevStep;
					const stepAnimationDelay = wasJustCompleted ? 0.6 : 0;

					return (
						<div
							key={index}
							className="relative flex flex-1 flex-col items-center"
						>
							{/* Connector */}
							{index < steps.length - 1 && (
								<div className="absolute top-8 left-[calc(50%+2rem)] h-1 w-[calc(100%-4rem)]">
									<div className="h-full bg-default-800">
										<motion.div
											className="h-full bg-linear-to-r from-primary via-secondary to-danger shadow-[0_0_10px_currentColor]"
											initial={{ width: "0%" }}
											animate={{ width: index < currentStep ? "100%" : "0%" }}
											transition={{ duration: 0.6, ease: "easeOut" }}
										/>
									</div>
								</div>
							)}

							<div className="relative">
								{/* Animated border fill effect using SVG */}
								<svg className="absolute inset-0 h-16 w-16" viewBox="0 0 64 64">
									<defs>
										<linearGradient
											id={`borderGradient-${index}`}
											x1="0%"
											y1="0%"
											x2="100%"
											y2="100%"
										>
											<stop offset="0%" stopColor="#006FEE" />
											<stop offset="50%" stopColor="#17C964" />
											<stop offset="100%" stopColor="#F31260" />
										</linearGradient>
									</defs>
									{/* Background border */}
									<rect
										x="1"
										y="1"
										width="62"
										height="62"
										rx="6"
										fill="none"
										stroke="#3f3f46"
										strokeWidth="2"
									/>
									{/* Animated border that draws around */}
									{(isCompleted || isCurrent) && (
										<motion.rect
											x="1"
											y="1"
											width="62"
											height="62"
											rx="6"
											fill="none"
											stroke={`url(#borderGradient-${index})`}
											strokeWidth="2"
											strokeDasharray="248"
											initial={{ strokeDashoffset: 248 }}
											animate={{ strokeDashoffset: 0 }}
											transition={{
												duration: 0.5,
												delay: stepAnimationDelay + 0.6,
												ease: "easeOut",
											}}
										/>
									)}
								</svg>

								<motion.button
									type="button"
									disabled={!isClickableStep}
									onClick={() => isClickableStep && onStepClick?.(index)}
									className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-lg font-bold text-lg ${
										isCompleted || isCurrent
											? "bg-primary/10 text-primary shadow-[0_0_20px_currentColor]"
											: "bg-default-900/50 text-default-600"
									} ${isClickableStep ? "cursor-pointer" : "cursor-default"}`}
									initial={false}
									animate={{
										scale: isCurrent ? [1, 1.1, 1] : 1,
										backgroundColor: isCurrent
											? [
													"rgba(0, 111, 238, 0.1)",
													"rgba(0, 111, 238, 0.2)",
													"rgba(0, 111, 238, 0.1)",
												]
											: isCompleted
												? "rgba(0, 111, 238, 0.1)"
												: "rgba(24, 24, 27, 0.5)",
										boxShadow: isCurrent
											? [
													"0 0 20px rgba(0, 111, 238, 0.5)",
													"0 0 40px rgba(0, 111, 238, 0.8)",
													"0 0 20px rgba(0, 111, 238, 0.5)",
												]
											: "0 0 0px rgba(0, 111, 238, 0)",
									}}
									transition={{
										scale: { duration: 0.3, delay: stepAnimationDelay + 0.3 },
										backgroundColor: {
											duration: 0.4,
											delay: stepAnimationDelay + 0.3,
										},
										boxShadow: {
											duration: 2,
											repeat: isCurrent ? Number.POSITIVE_INFINITY : 0,
											delay: stepAnimationDelay + 0.3,
										},
									}}
									whileHover={
										isClickableStep
											? {
													scale: 1.1,
													boxShadow: "0 0 30px rgba(0, 111, 238, 1)",
												}
											: {}
									}
									whileTap={isClickableStep ? { scale: 0.95 } : {}}
								>
									{isCompleted ? (
										<div className="relative h-8 w-8">
											{/* Animated checkmark using SVG path drawing */}
											<svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
												<motion.path
													d="M5 13l4 4L19 7"
													stroke="currentColor"
													strokeWidth="3"
													strokeLinecap="round"
													strokeLinejoin="round"
													initial={{ pathLength: 0, opacity: 0 }}
													animate={{ pathLength: 1, opacity: 1 }}
													transition={{
														pathLength: {
															duration: 0.4,
															ease: "easeOut",
														},
														opacity: {
															duration: 0.1,
														},
													}}
												/>
											</svg>
										</div>
									) : step.icon ? (
										step.icon
									) : (
										index + 1
									)}
								</motion.button>
							</div>

							{/* Label */}
							<motion.div
								className="mt-4 flex flex-col items-center"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.15 }}
							>
								<span
									className={`text-center font-bold font-mono text-sm uppercase tracking-wider ${
										isCurrent
											? "text-primary drop-shadow-[0_0_8px_rgba(0,111,238,0.8)]"
											: isCompleted
												? "text-foreground"
												: "text-default-600"
									}`}
								>
									{step.label}
								</span>
								{step.description && (
									<span className="mt-1 text-center font-mono text-default-500 text-xs">
										{step.description}
									</span>
								)}
							</motion.div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
