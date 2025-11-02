import { motion } from "framer-motion";

export function AnimatedDialogShowcase() {
	return (
		<div className="flex min-h-[400px] items-center justify-center p-8">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 30 }}
				className="mx-auto max-w-2xl text-center"
			>
				{/* Icon */}
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{
						delay: 0.3,
						type: "spring",
						stiffness: 200,
						damping: 15,
					}}
					className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20"
				>
					<motion.div
						animate={{
							rotate: [0, 10, -10, 0],
						}}
						transition={{
							duration: 2,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
						className="text-5xl"
					>
						✨
					</motion.div>
				</motion.div>

				{/* Main Message */}
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className="mb-4 bg-gradient-to-r from-primary via-secondary to-success bg-clip-text font-bold text-4xl text-transparent"
				>
					Animated Dialog
				</motion.h2>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
					className="mb-8 text-default-600 text-lg leading-relaxed"
				>
					The dialog you just opened morphed from the card you clicked. Notice
					how the card smoothly transformed into this dialog with a shared
					layout animation.
				</motion.p>

				{/* Features */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className="mb-8 space-y-4 text-left"
				>
					<h3 className="mb-4 text-center font-semibold text-default-900 text-xl">
						What You Just Experienced
					</h3>

					<div className="space-y-3">
						<div className="flex items-start gap-3 rounded-lg bg-default-50/50 p-4">
							<span className="text-2xl">🎯</span>
							<div>
								<h4 className="mb-1 font-semibold text-default-900">
									Shared Layout Animation
								</h4>
								<p className="text-default-600 text-sm">
									The card and dialog share the same{" "}
									<code className="rounded bg-default-100 px-2 py-0.5 text-xs">
										layoutId
									</code>
									, so Framer Motion automatically animates between them
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3 rounded-lg bg-default-50/50 p-4">
							<span className="text-2xl">🌊</span>
							<div>
								<h4 className="mb-1 font-semibold text-default-900">
									Spring Physics
								</h4>
								<p className="text-default-600 text-sm">
									Natural, bouncy motion using spring-based animations instead
									of linear easing
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3 rounded-lg bg-default-50/50 p-4">
							<span className="text-2xl">🎨</span>
							<div>
								<h4 className="mb-1 font-semibold text-default-900">
									Staggered Content
								</h4>
								<p className="text-default-600 text-sm">
									Header, tabs, and content animate in sequence for a polished
									feel
								</p>
							</div>
						</div>

						<div className="flex items-start gap-3 rounded-lg bg-default-50/50 p-4">
							<span className="text-2xl">✨</span>
							<div>
								<h4 className="mb-1 font-semibold text-default-900">
									Enhanced Visuals
								</h4>
								<p className="text-default-600 text-sm">
									Floating particles, gradient glows, and animated borders
									create depth
								</p>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Call to Action */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.7 }}
					className="rounded-xl bg-gradient-to-br from-primary/10 via-secondary/10 to-success/10 p-6"
				>
					<p className="mb-2 font-semibold text-default-900">
						Try it yourself!
					</p>
					<p className="text-default-600 text-sm">
						Close this dialog and click the card again to see the morphing
						animation in reverse. Switch to the Code tab to see how it's
						implemented.
					</p>
				</motion.div>
			</motion.div>
		</div>
	);
}
