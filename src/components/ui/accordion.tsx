import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

export interface AccordionItem {
	id: string;
	title: string;
	content: ReactNode;
	icon?: ReactNode;
}

interface AccordionProps {
	items: AccordionItem[];
	allowMultiple?: boolean;
	className?: string;
}

export function Accordion({
	items,
	allowMultiple = false,
	className = "",
}: AccordionProps) {
	const [openItems, setOpenItems] = useState<string[]>([]);

	const toggleItem = (id: string) => {
		if (allowMultiple) {
			setOpenItems((prev) =>
				prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
			);
		} else {
			setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
		}
	};

	return (
		<div className={`space-y-3 ${className}`}>
			{items.map((item, index) => {
				const isOpen = openItems.includes(item.id);

				return (
					<motion.div
						key={item.id}
						className="overflow-hidden rounded-xl border border-default-200 bg-default-50/50 backdrop-blur-sm"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: index * 0.1 }}
					>
						{/* Header */}
						<motion.button
							type="button"
							onClick={() => toggleItem(item.id)}
							className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-default-100/50"
							whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
							whileTap={{ scale: 0.99 }}
						>
							<div className="flex items-center gap-3">
								{item.icon && (
									<motion.div
										className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
										animate={{
											rotate: isOpen ? 360 : 0,
										}}
										transition={{
											type: "spring",
											stiffness: 200,
											damping: 20,
										}}
									>
										{item.icon}
									</motion.div>
								)}
								<h3 className="font-semibold text-default-900 text-lg">
									{item.title}
								</h3>
							</div>

							<motion.div
								animate={{ rotate: isOpen ? 180 : 0 }}
								transition={{
									type: "spring",
									stiffness: 200,
									damping: 20,
								}}
							>
								<ChevronDown className="h-5 w-5 text-default-500" />
							</motion.div>
						</motion.button>

						{/* Content */}
						<AnimatePresence initial={false}>
							{isOpen && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{
										height: "auto",
										opacity: 1,
										transition: {
											height: {
												type: "spring",
												stiffness: 300,
												damping: 30,
											},
											opacity: {
												duration: 0.2,
												delay: 0.1,
											},
										},
									}}
									exit={{
										height: 0,
										opacity: 0,
										transition: {
											height: {
												type: "spring",
												stiffness: 300,
												damping: 30,
											},
											opacity: {
												duration: 0.15,
											},
										},
									}}
									style={{ overflow: "hidden" }}
								>
									<motion.div
										className="border-default-200 border-t p-5 text-default-600"
										initial={{ y: -10 }}
										animate={{ y: 0 }}
										exit={{ y: -10 }}
										transition={{ duration: 0.2 }}
									>
										{item.content}
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				);
			})}
		</div>
	);
}
