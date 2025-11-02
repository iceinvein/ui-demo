import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedDialogProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	layoutId: string;
}

export function AnimatedDialog({
	isOpen,
	onClose,
	children,
	layoutId,
}: AnimatedDialogProps) {
	return (
		<AnimatePresence mode="wait">
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
						onClick={onClose}
					/>

					{/* Dialog - morphs from button */}
					<div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
						<motion.div
							layoutId={layoutId}
							className="pointer-events-auto relative flex h-[90vh] w-full max-w-5xl flex-col rounded-3xl border border-default-200 bg-background shadow-2xl"
							onClick={(e) => e.stopPropagation()}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 30,
							}}
						>
							{children}
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}

interface AnimatedDialogTriggerProps {
	onClick: () => void;
	children: ReactNode;
	layoutId: string;
	isOpen: boolean;
}

export function AnimatedDialogTrigger({
	onClick,
	children,
	layoutId,
	isOpen,
}: AnimatedDialogTriggerProps) {
	return (
		<AnimatePresence mode="wait">
			{!isOpen && (
				<motion.button
					layoutId={layoutId}
					onClick={onClick}
					className="group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-2xl border border-default-200/50 bg-gradient-to-br from-default-50 via-background to-default-100 p-6 shadow-lg backdrop-blur-sm"
					style={{
						transformStyle: "preserve-3d",
					}}
					whileHover={{
						y: -12,
						scale: 1.03,
						rotateX: 5,
						rotateY: 5,
						transition: {
							type: "spring",
							stiffness: 400,
							damping: 25,
						},
					}}
					whileTap={{ scale: 0.97 }}
					transition={{
						type: "spring",
						stiffness: 300,
						damping: 30,
					}}
				>
					{/* Animated gradient glow on hover */}
					<motion.div
						className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-secondary/0 to-success/0 opacity-0"
						initial={false}
						whileHover={{
							opacity: 1,
							background:
								"linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.08) 50%, rgba(34, 197, 94, 0.1) 100%)",
							transition: { duration: 0.4 },
						}}
					/>

					{/* Shimmer effect on hover */}
					<motion.div
						className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
						style={{
							background:
								"linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 55%, transparent 100%)",
						}}
						initial={{ x: "-150%", skewX: -20 }}
						whileHover={{
							x: "150%",
							transition: { duration: 0.8, ease: "easeInOut" },
						}}
					/>

					{/* Glowing border on hover */}
					<motion.div
						className="absolute inset-0 rounded-2xl border-2 border-transparent"
						initial={false}
						whileHover={{
							borderColor: "rgba(99, 102, 241, 0.4)",
							boxShadow:
								"0 0 20px rgba(99, 102, 241, 0.3), 0 0 40px rgba(99, 102, 241, 0.1), 0 20px 40px -12px rgba(0, 0, 0, 0.25)",
							transition: { duration: 0.3 },
						}}
					/>

					{/* Corner accents */}
					<motion.div
						className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-gradient-to-br from-primary/0 to-primary/0 opacity-0"
						whileHover={{
							opacity: 1,
							background:
								"radial-gradient(circle at top right, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
							transition: { duration: 0.3 },
						}}
					/>
					<motion.div
						className="absolute bottom-0 left-0 h-20 w-20 rounded-tr-full bg-gradient-to-tl from-secondary/0 to-secondary/0 opacity-0"
						whileHover={{
							opacity: 1,
							background:
								"radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.15) 0%, transparent 70%)",
							transition: { duration: 0.3 },
						}}
					/>

					{/* Floating particles on hover */}
					{[...Array(3)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute h-1 w-1 rounded-full bg-primary/40"
							style={{
								left: `${20 + i * 30}%`,
								top: `${30 + i * 20}%`,
							}}
							initial={{ opacity: 0, scale: 0 }}
							whileHover={{
								opacity: [0, 1, 0],
								scale: [0, 1.5, 0],
								y: [-20, -40, -60],
								transition: {
									duration: 1.5,
									delay: i * 0.2,
									repeat: Number.POSITIVE_INFINITY,
								},
							}}
						/>
					))}

					{children}
				</motion.button>
			)}
		</AnimatePresence>
	);
}
