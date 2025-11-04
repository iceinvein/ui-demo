import { motion } from "framer-motion";
import type { ComponentItem } from "@/types/component";

interface ComponentCardProps {
	component: ComponentItem;
	index: number;
	onClick: () => void;
}

export function ComponentCard({
	component,
	index,
	onClick,
}: ComponentCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.4,
				delay: index * 0.1,
				ease: [0.21, 0.47, 0.32, 0.98],
			}}
			whileHover={{
				y: -8,
				transition: { duration: 0.2 },
			}}
			className="group relative cursor-pointer"
			onClick={onClick}
		>
			<motion.div
				className="relative h-full overflow-hidden rounded-2xl border border-default-200 bg-linear-to-br from-default-50 to-default-100 p-6 shadow-sm transition-shadow duration-300"
				whileHover={{
					boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
				}}
			>
				{/* Animated gradient overlay */}
				<motion.div
					className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/5 to-success/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					initial={false}
				/>

				{/* Content */}
				<div className="relative z-10">
					<div className="mb-3 flex items-start justify-between">
						<h3 className="font-semibold text-default-900 text-lg">
							{component.title}
						</h3>
						<motion.div
							className="rounded-full bg-primary/10 p-2"
							whileHover={{ scale: 1.1, rotate: 5 }}
							transition={{ duration: 0.2 }}
						>
							<svg
								className="h-4 w-4 text-primary"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
						</motion.div>
					</div>

					<p className="mb-4 text-default-600 text-sm leading-relaxed">
						{component.description}
					</p>

					{/* Tags */}
					{component.tags && component.tags.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{component.tags.map((tag) => (
								<span
									key={tag}
									className="rounded-full bg-default-200/50 px-3 py-1 font-medium text-default-700 text-xs"
								>
									{tag}
								</span>
							))}
						</div>
					)}
				</div>
			</motion.div>
		</motion.div>
	);
}
