import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useEffect } from "react";

const spring = { type: "spring" as const, stiffness: 400, damping: 30 };
const instant = { duration: 0.01 };

interface AnimatedDialogProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	dialogId: string;
}

export function AnimatedDialog({
	isOpen,
	onClose,
	children,
	dialogId,
}: AnimatedDialogProps) {
	const prefersReducedMotion = useReducedMotion();
	const transition = prefersReducedMotion ? instant : spring;

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
			{/* Backdrop */}
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

			{/* Dialog — layoutId animates from trigger position */}
			<AnimatePresence>
				{isOpen && (
					<div
						className="pointer-events-none fixed inset-0 z-999 flex items-center justify-center p-4"
						role="dialog"
						aria-modal="true"
					>
						<motion.div
							layoutId={`dialog-${dialogId}`}
							className="pointer-events-auto relative flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-default-200 bg-background shadow-lg"
							style={{ borderRadius: 12 }}
							transition={transition}
							onClick={(e) => e.stopPropagation()}
						>
							{children}
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}

interface AnimatedDialogTriggerProps {
	onClick: () => void;
	children: ReactNode;
	isOpen: boolean;
	dialogId: string;
	className?: string;
	style?: CSSProperties;
}

export function AnimatedDialogTrigger({
	onClick,
	children,
	isOpen,
	dialogId,
	className,
	style,
}: AnimatedDialogTriggerProps) {
	const prefersReducedMotion = useReducedMotion();
	const transition = prefersReducedMotion ? instant : spring;

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick();
		}
	};

	return (
		<motion.div
			layoutId={`dialog-${dialogId}`}
			role="button"
			tabIndex={isOpen ? -1 : 0}
			onClick={isOpen ? undefined : onClick}
			onKeyDown={isOpen ? undefined : handleKeyDown}
			className={
				className ||
				"group relative flex h-full min-h-44 cursor-pointer flex-col overflow-hidden rounded-lg border border-default-200/40 bg-default-50 p-5 text-left transition-all duration-200 hover:border-default-300/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default-400 focus-visible:ring-offset-2"
			}
			style={{
				...style,
				borderRadius: 12,
			}}
			transition={transition}
		>
			{children}
		</motion.div>
	);
}
