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
		<AnimatePresence>
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
	if (isOpen) return null;

	return (
		<motion.button
			layoutId={layoutId}
			onClick={onClick}
			className="group relative rounded-2xl border border-default-200 bg-gradient-to-br from-default-50 to-default-100 p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
			whileHover={{
				y: -4,
				transition: { duration: 0.3, ease: "easeOut" },
			}}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 30,
			}}
		>
			{/* Subtle glow effect on hover */}
			<motion.div
				className="absolute inset-0 rounded-2xl bg-primary/0 transition-all duration-300 group-hover:bg-primary/5"
				initial={false}
			/>
			{children}
		</motion.button>
	);
}
