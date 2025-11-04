import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect } from "react";

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
	// Lock body scroll when dialog is open
	useEffect(() => {
		if (isOpen) {
			// Prevent body scroll but allow dialog content to scroll
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";

			return () => {
				// Restore original overflow
				document.body.style.overflow = originalOverflow;
			};
		}
	}, [isOpen]);

	return (
		<AnimatePresence mode="wait">
			{isOpen && (
				<>
					{/* Simple clean backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-999 bg-black/80 backdrop-blur-sm"
						onClick={onClose}
					/>

					{/* Dialog - morphs from button */}
					<div className="pointer-events-none fixed inset-0 z-999 flex items-center justify-center p-4">
						<motion.div
							layoutId={layoutId}
							className="pointer-events-auto relative flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-default-200/30 bg-background shadow-xl"
							onClick={(e) => e.stopPropagation()}
							transition={{
								layout: {
									type: "spring",
									stiffness: 300,
									damping: 30,
								},
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
		<>
			{!isOpen && (
				<motion.button
					layoutId={layoutId}
					onClick={onClick}
					className="group relative flex h-full min-h-60 flex-col overflow-hidden rounded-xl border border-default-200/50 bg-linear-to-br from-default-50 via-background to-default-100 p-6 shadow-md backdrop-blur-sm transition-colors hover:border-default-300"
					whileHover={{
						y: -4,
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
					{children}
				</motion.button>
			)}
			{isOpen && (
				<div
					className="pointer-events-none invisible min-h-60"
					aria-hidden="true"
				/>
			)}
		</>
	);
}
