import { Lock, Package, Rocket, User } from "lucide-react";
import { useState } from "react";
import { NeonGlowStepper, type Step } from "./ui/stepper";

export function StepperDemo() {
	const [currentStep, setCurrentStep] = useState(1);

	// Project launch steps
	const launchSteps: Step[] = [
		{
			label: "Planning",
			description: "Define goals",
			icon: <User className="h-6 w-6" />,
		},
		{
			label: "Development",
			description: "Build features",
			icon: <Package className="h-6 w-6" />,
		},
		{
			label: "Testing",
			description: "Quality assurance",
			icon: <Lock className="h-6 w-6" />,
		},
		{
			label: "Launch",
			description: "Go live!",
			icon: <Rocket className="h-6 w-6" />,
		},
	];

	return (
		<div className="w-full space-y-8 p-8">
			{/* Header */}
			<div>
				<h3 className="font-bold text-2xl">Neon Cyberpunk Stepper</h3>
				<p className="mt-2 text-default-500">
					Cyberpunk-style stepper with animated neon glows, scanlines, and
					electric effects
				</p>
			</div>

			{/* Neon Glow Stepper */}
			<section className="space-y-4">
				<div className="overflow-hidden rounded-2xl">
					<NeonGlowStepper
						steps={launchSteps}
						currentStep={currentStep}
						onStepClick={setCurrentStep}
					/>
					<div className="flex justify-center gap-3 border-primary/20 border-t bg-black/40 p-6 backdrop-blur-md">
						<button
							type="button"
							onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
							disabled={currentStep === 0}
							className="rounded-lg border border-primary/30 bg-primary/10 px-6 py-2.5 font-medium font-mono text-primary text-sm shadow-[0_0_10px_rgba(0,111,238,0.3)] transition-all hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(0,111,238,0.5)] disabled:cursor-not-allowed disabled:opacity-50"
						>
							PREV
						</button>
						<button
							type="button"
							onClick={() =>
								setCurrentStep(
									Math.min(launchSteps.length - 1, currentStep + 1),
								)
							}
							disabled={currentStep === launchSteps.length - 1}
							className="rounded-lg border border-primary bg-primary px-6 py-2.5 font-medium font-mono text-sm text-white shadow-[0_0_20px_rgba(0,111,238,0.5)] transition-all hover:shadow-[0_0_30px_rgba(0,111,238,0.8)] disabled:cursor-not-allowed disabled:opacity-50"
						>
							NEXT
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
