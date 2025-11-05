import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { type ReactNode, useState } from "react";

export interface FormStep {
	id: string;
	title: string;
	description?: string;
	content: ReactNode;
	icon?: ReactNode;
}

interface MultiStepFormProps {
	steps: FormStep[];
	onComplete?: () => void;
	onStepChange?: (stepIndex: number) => void;
	className?: string;
	orientation?: "horizontal" | "vertical";
}

export function MultiStepForm({
	steps,
	onComplete,
	onStepChange,
	className = "",
	orientation = "horizontal",
}: MultiStepFormProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const [direction, setDirection] = useState(1);
	const isVertical = orientation === "vertical";

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setDirection(1);
			setCurrentStep(currentStep + 1);
			onStepChange?.(currentStep + 1);
		} else {
			onComplete?.();
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setDirection(-1);
			setCurrentStep(currentStep - 1);
			onStepChange?.(currentStep - 1);
		}
	};

	const handleStepClick = (index: number) => {
		if (index < currentStep) {
			setDirection(-1);
			setCurrentStep(index);
			onStepChange?.(index);
		}
	};

	const progress = ((currentStep + 1) / steps.length) * 100;

	if (isVertical) {
		return (
			<div className={`flex w-full gap-8 ${className}`}>
				{/* Vertical Stepper Sidebar */}
				<div className="w-64 shrink-0">
					{steps.map((step, index) => {
						const isCompleted = index < currentStep;
						const isCurrent = index === currentStep;
						const isClickable = index < currentStep;

						return (
							<div key={step.id} className="relative">
								{/* Step Item */}
								<motion.button
									type="button"
									onClick={() => isClickable && handleStepClick(index)}
									disabled={!isClickable}
									className={`relative w-full text-left ${isClickable ? "cursor-pointer" : "cursor-default"}`}
									whileHover={isClickable ? { x: 4 } : {}}
									whileTap={isClickable ? { scale: 0.98 } : {}}
								>
									<div className="flex items-start gap-4 pb-8">
										{/* Step Circle with Icon/Number */}
										<div className="relative shrink-0">
											<motion.div
												className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-2 shadow-lg transition-all ${
													isCompleted
														? "border-primary bg-primary text-white shadow-primary/20"
														: isCurrent
															? "border-primary bg-linear-to-br from-primary/10 to-primary/5 text-primary shadow-primary/10"
															: "border-default-300 bg-background text-default-400"
												}`}
												animate={{
													scale: isCurrent ? [1, 1.05, 1] : 1,
												}}
												transition={{
													duration: 2,
													repeat: isCurrent ? Number.POSITIVE_INFINITY : 0,
													ease: "easeInOut",
												}}
											>
												<AnimatePresence mode="wait">
													{isCompleted ? (
														<motion.div
															key="check"
															initial={{ scale: 0, rotate: -180 }}
															animate={{ scale: 1, rotate: 0 }}
															exit={{ scale: 0, rotate: 180 }}
															transition={{ duration: 0.3, type: "spring" }}
														>
															<Check className="h-6 w-6" strokeWidth={3} />
														</motion.div>
													) : step.icon ? (
														<motion.div
															key="icon"
															initial={{ scale: 0 }}
															animate={{ scale: 1 }}
															exit={{ scale: 0 }}
															className="flex items-center justify-center"
														>
															{step.icon}
														</motion.div>
													) : (
														<motion.span
															key="number"
															initial={{ scale: 0 }}
															animate={{ scale: 1 }}
															exit={{ scale: 0 }}
															className="font-bold text-lg"
														>
															{index + 1}
														</motion.span>
													)}
												</AnimatePresence>
											</motion.div>

											{/* Glow effect for current step */}
											{isCurrent && (
												<motion.div
													className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl"
													animate={{
														scale: [1, 1.2, 1],
														opacity: [0.5, 0.8, 0.5],
													}}
													transition={{
														duration: 2,
														repeat: Number.POSITIVE_INFINITY,
														ease: "easeInOut",
													}}
												/>
											)}
										</div>

										{/* Step Info */}
										<div className="flex-1 pt-2">
											<motion.h4
												className={`mb-1 font-semibold text-sm transition-colors ${
													isCurrent
														? "text-foreground"
														: isCompleted
															? "text-foreground"
															: "text-default-500"
												}`}
												animate={{
													x: isCurrent ? [0, 2, 0] : 0,
												}}
												transition={{
													duration: 2,
													repeat: isCurrent ? Number.POSITIVE_INFINITY : 0,
													ease: "easeInOut",
												}}
											>
												{step.title}
											</motion.h4>
											{step.description && (
												<p
													className={`text-xs ${
														isCurrent ? "text-default-600" : "text-default-400"
													}`}
												>
													{step.description}
												</p>
											)}
										</div>
									</div>
								</motion.button>

								{/* Connector Line */}
								{index < steps.length - 1 && (
									<div className="absolute top-14 left-7 h-8 w-0.5 bg-default-200">
										<motion.div
											className="h-full w-full bg-primary"
											initial={{ scaleY: 0 }}
											animate={{
												scaleY: index < currentStep ? 1 : 0,
											}}
											transition={{ duration: 0.3, ease: "easeInOut" }}
											style={{ originY: 0 }}
										/>
									</div>
								)}
							</div>
						);
					})}
				</div>

				{/* Content Area */}
				<div className="flex-1">
					{/* Progress Bar */}
					<div className="mb-6">
						<div className="mb-2 flex items-center justify-between text-sm">
							<span className="font-medium text-default-600">Progress</span>
							<span className="font-semibold text-primary">
								{Math.round(progress)}%
							</span>
						</div>
						<div className="relative h-2 overflow-hidden rounded-full bg-default-200">
							<motion.div
								className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-primary to-primary/80"
								initial={{ width: 0 }}
								animate={{ width: `${progress}%` }}
								transition={{ duration: 0.5, ease: "easeOut" }}
							/>
						</div>
					</div>

					{/* Step Content */}
					<div className="relative mb-6 min-h-[400px] rounded-2xl border border-default-200 bg-default-50/50 p-8">
						<AnimatePresence mode="wait" custom={direction}>
							<motion.div
								key={currentStep}
								custom={direction}
								initial={{ opacity: 0, y: direction * 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: direction * -20 }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
							>
								{steps[currentStep].content}
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Navigation Buttons */}
					<div className="flex items-center justify-between">
						<motion.button
							type="button"
							onClick={handlePrevious}
							disabled={currentStep === 0}
							className="rounded-xl border-2 border-default-300 bg-background px-6 py-3 font-semibold text-sm transition-colors hover:border-default-400 hover:bg-default-100 disabled:cursor-not-allowed disabled:opacity-40"
							whileHover={currentStep > 0 ? { scale: 1.02 } : {}}
							whileTap={currentStep > 0 ? { scale: 0.98 } : {}}
						>
							← Previous
						</motion.button>

						<motion.button
							type="button"
							onClick={handleNext}
							className="rounded-xl bg-linear-to-r from-primary to-primary/90 px-8 py-3 font-semibold text-sm text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/30 hover:shadow-xl"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							{currentStep === steps.length - 1 ? "Complete ✓" : "Next →"}
						</motion.button>
					</div>
				</div>
			</div>
		);
	}

	// Horizontal Layout
	return (
		<div className={`w-full ${className}`}>
			{/* Progress Bar with Percentage */}
			<div className="mb-8">
				<div className="mb-3 flex items-center justify-between">
					<span className="font-semibold text-default-600 text-sm">
						Step {currentStep + 1} of {steps.length}
					</span>
					<motion.span
						key={progress}
						initial={{ scale: 1.2, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className="font-bold text-primary text-sm"
					>
						{Math.round(progress)}%
					</motion.span>
				</div>
				<div className="relative h-3 overflow-hidden rounded-full bg-default-200 shadow-inner">
					<motion.div
						className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-primary via-primary to-primary/80 shadow-lg shadow-primary/20"
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						transition={{ duration: 0.5, ease: "easeOut" }}
					/>
					<motion.div
						className="absolute inset-y-0 left-0 rounded-full bg-white/20"
						initial={{ width: 0 }}
						animate={{ width: `${progress}%` }}
						transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
					/>
				</div>
			</div>

			{/* Step Indicators */}
			<div className="mb-10 flex items-start justify-between">
				{steps.map((step, index) => {
					const isCompleted = index < currentStep;
					const isCurrent = index === currentStep;
					const isClickable = index < currentStep;

					return (
						<div key={step.id} className="flex flex-1 items-start">
							<div className="flex w-full flex-col items-center">
								{/* Step Circle */}
								<motion.button
									type="button"
									onClick={() => isClickable && handleStepClick(index)}
									className={`group relative mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border-2 shadow-lg transition-all ${
										isCompleted
											? "border-primary bg-primary text-white shadow-primary/25"
											: isCurrent
												? "border-primary bg-linear-to-br from-primary/10 to-primary/5 text-primary shadow-primary/20"
												: "border-default-300 bg-background text-default-400 shadow-default-200"
									} ${isClickable ? "cursor-pointer" : "cursor-default"}`}
									whileHover={isClickable ? { scale: 1.1, y: -2 } : {}}
									whileTap={isClickable ? { scale: 0.95 } : {}}
									disabled={!isClickable}
									animate={{
										scale: isCurrent ? [1, 1.05, 1] : 1,
									}}
									transition={{
										duration: 2,
										repeat: isCurrent ? Number.POSITIVE_INFINITY : 0,
										ease: "easeInOut",
									}}
								>
									<AnimatePresence mode="wait">
										{isCompleted ? (
											<motion.div
												key="check"
												initial={{ scale: 0, rotate: -180 }}
												animate={{ scale: 1, rotate: 0 }}
												exit={{ scale: 0, rotate: 180 }}
												transition={{
													duration: 0.3,
													type: "spring",
													stiffness: 200,
												}}
											>
												<Check className="h-7 w-7" strokeWidth={3} />
											</motion.div>
										) : step.icon ? (
											<motion.div
												key="icon"
												initial={{ scale: 0, rotate: -90 }}
												animate={{ scale: 1, rotate: 0 }}
												exit={{ scale: 0, rotate: 90 }}
												transition={{ duration: 0.2 }}
												className="flex items-center justify-center"
											>
												{step.icon}
											</motion.div>
										) : (
											<motion.span
												key="number"
												initial={{ scale: 0 }}
												animate={{ scale: 1 }}
												exit={{ scale: 0 }}
												transition={{ duration: 0.2 }}
												className="font-bold text-xl"
											>
												{index + 1}
											</motion.span>
										)}
									</AnimatePresence>

									{/* Glow effect for current step */}
									{isCurrent && (
										<motion.div
											className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl"
											animate={{
												scale: [1, 1.3, 1],
												opacity: [0.5, 0.8, 0.5],
											}}
											transition={{
												duration: 2,
												repeat: Number.POSITIVE_INFINITY,
												ease: "easeInOut",
											}}
										/>
									)}
								</motion.button>

								{/* Step Label */}
								<div className="text-center">
									<motion.p
										className={`mb-1 font-semibold text-xs transition-colors ${
											isCurrent
												? "text-foreground"
												: isCompleted
													? "text-foreground"
													: "text-default-500"
										}`}
										animate={{
											y: isCurrent ? [0, -2, 0] : 0,
										}}
										transition={{
											duration: 2,
											repeat: isCurrent ? Number.POSITIVE_INFINITY : 0,
											ease: "easeInOut",
										}}
									>
										{step.title}
									</motion.p>
									{step.description && (
										<p className="text-default-400 text-xs">
											{step.description}
										</p>
									)}
								</div>
							</div>

							{/* Connector Line */}
							{index < steps.length - 1 && (
								<div className="relative mx-3 mt-8 h-1 flex-1 rounded-full bg-default-200">
									<motion.div
										className="absolute inset-0 rounded-full bg-linear-to-r from-primary to-primary/80 shadow-primary/20 shadow-sm"
										initial={{ scaleX: 0 }}
										animate={{
											scaleX: index < currentStep ? 1 : 0,
										}}
										transition={{ duration: 0.4, ease: "easeOut" }}
										style={{ originX: 0 }}
									/>
								</div>
							)}
						</div>
					);
				})}
			</div>

			{/* Step Content Card */}
			<motion.div
				className="mb-8 overflow-hidden rounded-2xl border border-default-200 bg-linear-to-br from-default-50/50 to-background shadow-lg"
				layout
			>
				<div className="relative min-h-[350px] p-8">
					<AnimatePresence mode="wait" custom={direction}>
						<motion.div
							key={currentStep}
							custom={direction}
							initial={{ opacity: 0, x: direction * 30, scale: 0.98 }}
							animate={{ opacity: 1, x: 0, scale: 1 }}
							exit={{ opacity: 0, x: direction * -30, scale: 0.98 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							{steps[currentStep].content}
						</motion.div>
					</AnimatePresence>
				</div>
			</motion.div>

			{/* Navigation Buttons */}
			<div className="flex items-center justify-between">
				<motion.button
					type="button"
					onClick={handlePrevious}
					disabled={currentStep === 0}
					className="rounded-xl border-2 border-default-300 bg-background px-6 py-3 font-semibold text-sm transition-all hover:border-default-400 hover:bg-default-100 disabled:cursor-not-allowed disabled:opacity-40"
					whileHover={currentStep > 0 ? { scale: 1.02, x: -2 } : {}}
					whileTap={currentStep > 0 ? { scale: 0.98 } : {}}
				>
					← Previous
				</motion.button>

				<motion.button
					type="button"
					onClick={handleNext}
					className="rounded-xl bg-linear-to-r from-primary to-primary/90 px-8 py-3 font-semibold text-sm text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/30 hover:shadow-xl"
					whileHover={{ scale: 1.02, x: 2 }}
					whileTap={{ scale: 0.98 }}
				>
					{currentStep === steps.length - 1 ? "Complete ✓" : "Next →"}
				</motion.button>
			</div>
		</div>
	);
}
