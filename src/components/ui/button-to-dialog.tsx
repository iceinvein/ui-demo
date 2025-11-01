import { AnimatePresence, motion } from "framer-motion";

interface ButtonToDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	description: string;
	confirmText?: string;
	cancelText?: string;
	layoutId: string;
}

export function ButtonToDialog({
	isOpen,
	onClose,
	onConfirm,
	title,
	description,
	confirmText = "Confirm",
	cancelText = "Cancel",
	layoutId,
}: ButtonToDialogProps) {
	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 z-50 bg-black/80"
							onClick={onClose}
						/>

						{/* Dialog Container */}
						<div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
							<motion.div
								initial={{
									opacity: 0,
									scaleY: 0.3,
									scaleX: 0.95,
								}}
								animate={{
									opacity: 1,
									scaleY: 1,
									scaleX: 1,
								}}
								exit={{
									opacity: 0,
									scaleY: 0.3,
									scaleX: 0.95,
								}}
								transition={{
									type: "spring",
									stiffness: 400,
									damping: 35,
								}}
								className="pointer-events-auto relative w-full max-w-md overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-900 shadow-2xl"
								style={{ originY: 0.85 }}
							>
								{/* Close Button */}
								<motion.button
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ delay: 0.15, duration: 0.15 }}
									onClick={onClose}
									className="absolute top-4 right-4 z-10 rounded-full p-2 transition-colors hover:bg-zinc-800"
									aria-label="Close dialog"
								>
									<svg
										className="h-5 w-5 text-zinc-400"
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
								</motion.button>

								{/* Content */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ delay: 0.1, duration: 0.15 }}
									className="px-8 pt-12 pb-6"
								>
									<div className="mb-4 flex items-center gap-3">
										<div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20">
											<span className="text-red-400 text-xl">⚠</span>
										</div>
										<h2 className="font-semibold text-2xl text-white">
											{title}
										</h2>
									</div>
									<p className="mb-8 text-base text-zinc-400">{description}</p>
								</motion.div>

								{/* Action Buttons */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ delay: 0.05, duration: 0.15 }}
									className="flex gap-3 px-6 pb-6"
								>
									<motion.button
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ delay: 0.15, duration: 0.15 }}
										type="button"
										onClick={onClose}
										className="flex-1 rounded-full bg-zinc-800 px-6 py-4 font-medium text-white transition-colors hover:bg-zinc-700"
									>
										{cancelText}
									</motion.button>

									{/* Confirm Button - shares layoutId with trigger */}
									<motion.button
										layoutId={layoutId}
										type="button"
										onClick={onConfirm}
										className="flex-1 rounded-full bg-red-500 px-6 py-4 font-medium text-white transition-colors hover:bg-red-400"
										transition={{
											type: "spring",
											stiffness: 400,
											damping: 35,
										}}
									>
										{confirmText}
									</motion.button>
								</motion.div>
							</motion.div>
						</div>
					</>
				)}
			</AnimatePresence>

			{/* Trigger Button - full width */}
			<AnimatePresence>
				{!isOpen && (
					<div className="w-full max-w-md">
						<motion.button
							layoutId={layoutId}
							type="button"
							onClick={() => {}}
							className="w-full rounded-full bg-red-500 px-12 py-4 font-semibold text-lg text-white transition-colors hover:bg-red-400"
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 35,
							}}
						>
							{confirmText}
						</motion.button>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}
