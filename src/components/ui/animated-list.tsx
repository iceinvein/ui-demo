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
		<ul className={`flex flex-col gap-3 ${className}`}>
			<AnimatePresence initial={false}>
				{items.map((item) => (
					<motion.li
						key={item.id}
						layout
						initial={{ opacity: 0, scale: 0.8, y: -20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.8, y: -20 }}
						transition={{
							type: "spring",
							stiffness: 400,
							damping: 30,
							mass: 0.8,
						}}
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
					</motion.li>
				))}
			</AnimatePresence>
		</ul>
	);
}
