import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";

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
	const prefersReducedMotion = useReducedMotion();
	// Keep dialog in DOM briefly after close so layoutId can morph back to card
	const [isPresent, setIsPresent] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setIsPresent(true);
		} else {
			const timer = setTimeout(() => setIsPresent(false), 500);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	useEffect(() => {
		if (isOpen) {
			const originalOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";

			const handleEscape = (e: KeyboardEvent) => {
				if (e.key === "Escape") onClose();
			};
			document.addEventListener("keydown", handleEscape);

			return () => {
				document.body.style.overflow = originalOverflow;
				document.removeEventListener("keydown", handleEscape);
			};
		}
	}, [isOpen, onClose]);

	return (
		<>
			{/* Backdrop — fades independently */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-999 bg-background/80 backdrop-blur-sm"
						onClick={onClose}
						aria-hidden="true"
					/>
				)}
			</AnimatePresence>

			{/* Dialog panel — isOpen gives instant show (no frame gap for opening morph),
			    isPresent keeps it alive briefly after close for morph-back. */}
			{(isOpen || isPresent) && (
				<div
					className="pointer-events-none fixed inset-0 z-999 flex items-center justify-center p-4"
					role="dialog"
					aria-modal="true"
				>
					<motion.div
						layoutId={layoutId}
						className="relative flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-default-200 bg-background shadow-lg"
						animate={{ opacity: isOpen ? 1 : 0 }}
						style={{ pointerEvents: isOpen ? "auto" : "none" }}
						onClick={(e) => e.stopPropagation()}
						transition={
							prefersReducedMotion
								? { duration: 0.01 }
								: {
										opacity: { duration: 0.15 },
										layout: {
											type: "spring",
											stiffness: 300,
											damping: 30,
										},
									}
						}
					>
						{children}
					</motion.div>
				</div>
			)}
		</>
	);
}

interface AnimatedDialogTriggerProps {
	onClick: () => void;
	children: ReactNode;
	layoutId: string;
	isOpen: boolean;
	className?: string;
	style?: CSSProperties;
	reducedMotion?: boolean;
}

export function AnimatedDialogTrigger({
	onClick,
	children,
	layoutId,
	isOpen,
	className,
	style,
	reducedMotion,
}: AnimatedDialogTriggerProps) {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick();
		}
	};

	return (
		<>
			{!isOpen && (
				<motion.div
					role="button"
					tabIndex={0}
					layoutId={layoutId}
					onClick={onClick}
					onKeyDown={handleKeyDown}
					className={
						className ||
						"group relative flex h-full min-h-44 cursor-pointer flex-col overflow-hidden rounded-lg border border-default-200/40 bg-default-50 p-5 text-left transition-all duration-200 hover:border-default-300/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default-400 focus-visible:ring-offset-2"
					}
					style={style}
					transition={
						reducedMotion
							? { duration: 0.01 }
							: { type: "spring", stiffness: 300, damping: 30 }
					}
				>
					{children}
				</motion.div>
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
