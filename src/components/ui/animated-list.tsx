import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import type { ReactNode } from "react";

export interface AnimatedListItem {
	id: string;
	content: ReactNode;
	title?: string; // Optional title for tracking duplicates
}

export interface AnimatedListProps {
	items: AnimatedListItem[];
	onRemove?: (id: string) => void;
	className?: string;
	itemClassName?: string;
	showRemoveButton?: boolean;
}

/**
 * AnimatedList component with smooth enter/exit animations
 * Items grow in and shift the list when added, shrink and shift when removed
 */
export function AnimatedList({
	items,
	onRemove,
	className = "",
	itemClassName = "",
	showRemoveButton = true,
}: AnimatedListProps) {
	return (
		<motion.div
			layout
			role="list"
			className={`flex flex-col gap-3 ${className}`}
			transition={{
				type: "spring",
				stiffness: 500,
				damping: 40,
			}}
		>
			<AnimatePresence initial={false} mode="popLayout">
				{items.map((item) => (
					<motion.div
						key={item.id}
						layout
						role="listitem"
						initial={{ opacity: 0, scaleY: 0, y: -20 }}
						animate={{
							opacity: 1,
							scaleY: 1,
							y: 0,
							transition: {
								opacity: { duration: 0.2 },
								scaleY: {
									type: "spring",
									stiffness: 500,
									damping: 35,
								},
								y: {
									type: "spring",
									stiffness: 500,
									damping: 35,
								},
							},
						}}
						exit={{
							opacity: 0,
							scaleY: 0,
							y: -20,
							transition: {
								opacity: { duration: 0.15 },
								scaleY: {
									type: "spring",
									stiffness: 500,
									damping: 35,
								},
								y: { duration: 0.2 },
							},
						}}
						style={{
							originY: 0,
						}}
					>
						<div
							className={`group relative flex items-center justify-between gap-4 rounded-2xl border border-default-200 bg-gradient-to-br from-default-50 to-default-100/50 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-default-300 hover:shadow-md ${itemClassName}`}
						>
							<div className="flex-1">{item.content}</div>
							{showRemoveButton && onRemove && (
								<motion.button
									type="button"
									onClick={() => onRemove(item.id)}
									className="flex h-9 w-9 items-center justify-center rounded-xl bg-danger/10 text-danger opacity-0 transition-all hover:bg-danger hover:text-white group-hover:opacity-100"
									whileHover={{ scale: 1.1, rotate: 5 }}
									whileTap={{ scale: 0.9, rotate: -5 }}
									aria-label="Remove item"
								>
									<Trash2 className="h-4 w-4" />
								</motion.button>
							)}
						</div>
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	);
}
