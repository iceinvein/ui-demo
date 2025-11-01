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
					className="group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-2xl border border-default-200 bg-gradient-to-br from-default-50 to-default-100 p-6 shadow-sm"
					whileHover={{
						y: -8,
						scale: 1.02,
						transition: {
							type: "spring",
							stiffness: 400,
							damping: 25,
						},
					}}
					whileTap={{ scale: 0.98 }}
					transition={{
						type: "spring",
						stiffness: 300,
						damping: 30,
					}}
				>
					{/* Animated gradient glow on hover */}
					<motion.div
						className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0"
						initial={false}
						whileHover={{
							background: [
								"linear-gradient(135deg, rgba(var(--color-primary-rgb, 99, 102, 241), 0) 0%, rgba(var(--color-primary-rgb, 99, 102, 241), 0) 100%)",
								"linear-gradient(135deg, rgba(var(--color-primary-rgb, 99, 102, 241), 0.05) 0%, rgba(var(--color-primary-rgb, 99, 102, 241), 0.1) 100%)",
							],
							transition: { duration: 0.4 },
						}}
					/>

					{/* Shimmer effect on hover */}
					<motion.div
						className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
						style={{
							background:
								"linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
						}}
						initial={{ x: "-100%" }}
						whileHover={{
							x: "100%",
							transition: { duration: 0.6, ease: "easeInOut" },
						}}
					/>

					{/* Border highlight */}
					<motion.div
						className="absolute inset-0 rounded-2xl border-2 border-primary/0"
						initial={false}
						whileHover={{
							borderColor: "rgba(var(--color-primary-rgb, 99, 102, 241), 0.3)",
							boxShadow:
								"0 8px 24px -4px rgba(var(--color-primary-rgb, 99, 102, 241), 0.2)",
							transition: { duration: 0.3 },
						}}
					/>

					{children}
				</motion.button>
			)}
		</AnimatePresence>
	);
}
