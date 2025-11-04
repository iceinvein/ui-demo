import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatedDialog, AnimatedDialogTrigger } from "./ui/animated-dialog";

export function AnimatedDialogDemo() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="flex min-h-[400px] items-center justify-center">
			<AnimatedDialogTrigger
				layoutId="demo-dialog"
				isOpen={isOpen}
				onClick={() => setIsOpen(true)}
			>
				<div className="text-center">
					<div className="mb-2 text-2xl">✨</div>
					<h3 className="mb-2 font-semibold text-lg">Click to Open</h3>
					<p className="text-default-600 text-sm">
						Watch the button morph into a dialog
					</p>
				</div>
			</AnimatedDialogTrigger>

			<AnimatedDialog
				layoutId="demo-dialog"
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.1 }}
					className="flex h-full flex-col"
				>
					{/* Header */}
					<div className="flex items-center justify-between rounded-t-3xl border-default-200 border-b bg-default-50/50 px-6 py-4">
						<div>
							<h2 className="font-bold text-2xl text-default-900">
								Animated Dialog
							</h2>
							<p className="text-default-600 text-sm">
								Smooth morphing transition from button to dialog
							</p>
						</div>
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="rounded-full p-2 transition-colors hover:bg-default-100"
							aria-label="Close dialog"
						>
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
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					{/* Content */}
					<div className="flex-1 overflow-y-auto p-8">
						<div className="mx-auto max-w-2xl space-y-6">
							<div>
								<h3 className="mb-3 font-semibold text-xl">How it works</h3>
								<p className="text-default-600 leading-relaxed">
									This dialog uses Framer Motion's layout animations with a
									shared{" "}
									<code className="rounded bg-default-100 px-2 py-1 text-sm">
										layoutId
									</code>
									. When the trigger button unmounts and the dialog mounts,
									Framer Motion automatically animates the position, size, and
									border radius between them.
								</p>
							</div>

							<div>
								<h3 className="mb-3 font-semibold text-xl">Key Features</h3>
								<ul className="space-y-2 text-default-600">
									<li className="flex items-start gap-2">
										<span className="mt-1 text-primary">•</span>
										<span>
											Smooth morphing animation from trigger to dialog
										</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="mt-1 text-primary">•</span>
										<span>Spring-based physics for natural movement</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="mt-1 text-primary">•</span>
										<span>Backdrop blur and fade effects</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="mt-1 text-primary">•</span>
										<span>Staggered content animations</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="mt-1 text-primary">•</span>
										<span>Fully accessible with keyboard support</span>
									</li>
								</ul>
							</div>

							<div className="rounded-xl bg-linear-to-br from-primary/10 to-secondary/10 p-6">
								<p className="text-center text-default-700">
									This is inspired by Family's beautiful dialog animations. The
									shared layout ID creates a seamless transition that feels
									magical! ✨
								</p>
							</div>
						</div>
					</div>
				</motion.div>
			</AnimatedDialog>
		</div>
	);
}
