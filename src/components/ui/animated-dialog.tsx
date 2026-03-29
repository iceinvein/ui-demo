import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect } from "react";

interface AnimatedDialogProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	originRef: React.RefObject<HTMLElement | null>;
}

export function AnimatedDialog({
	isOpen,
	onClose,
	children,
	originRef,
}: AnimatedDialogProps) {
	const prefersReducedMotion = useReducedMotion();

	const getMorphTransform = useCallback(() => {
		const rect = originRef.current?.getBoundingClientRect();
		if (!rect) return { scale: 0.9, opacity: 0 };
		const vpCenterX = window.innerWidth / 2;
		const vpCenterY = window.innerHeight / 2;
		const cardCenterX = rect.left + rect.width / 2;
		const cardCenterY = rect.top + rect.height / 2;
		const dialogWidth = Math.min(window.innerWidth - 32, 1280);
		return {
			x: cardCenterX - vpCenterX,
			y: cardCenterY - vpCenterY,
			scale: rect.width / dialogWidth,
			borderRadius: "12px",
			opacity: 0,
		};
	}, [originRef]);

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

	const spring = prefersReducedMotion
		? { duration: 0.01 }
		: { type: "spring" as const, stiffness: 300, damping: 30, opacity: { duration: 0.15 } };

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

			{/* Dialog panel — AnimatePresence for exit morph-back */}
			<AnimatePresence>
				{isOpen && (
					<div
						className="pointer-events-none fixed inset-0 z-999 flex items-center justify-center p-4"
						role="dialog"
						aria-modal="true"
					>
						<motion.div
							initial={getMorphTransform()}
							animate={{
								x: 0,
								y: 0,
								scale: 1,
								opacity: 1,
								borderRadius: "12px",
							}}
							exit={getMorphTransform()}
							transition={spring}
							className="pointer-events-auto relative flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-default-200 bg-background shadow-lg"
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
	className?: string;
	style?: CSSProperties;
	triggerRef: React.RefObject<HTMLDivElement | null>;
}

export function AnimatedDialogTrigger({
	onClick,
	children,
	isOpen,
	className,
	style,
	triggerRef,
}: AnimatedDialogTriggerProps) {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onClick();
		}
	};

	return (
		<div
			ref={triggerRef}
			role="button"
			tabIndex={0}
			onClick={onClick}
			onKeyDown={handleKeyDown}
			className={
				className ||
				"group relative flex h-full min-h-44 cursor-pointer flex-col overflow-hidden rounded-lg border border-default-200/40 bg-default-50 p-5 text-left transition-all duration-200 hover:border-default-300/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-default-400 focus-visible:ring-offset-2"
			}
			style={{
				...style,
				opacity: isOpen ? 0 : 1,
				transition: "opacity 0.15s",
			}}
		>
			{children}
		</div>
	);
}
