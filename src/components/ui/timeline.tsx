import { motion } from "framer-motion";
import type { ReactNode } from "react";

export interface TimelineItem {
	id: string;
	title: string;
	description: string;
	date: string;
	icon?: ReactNode;
	color?: string;
}

interface TimelineProps {
	items: TimelineItem[];
	className?: string;
}

export function Timeline({ items, className = "" }: TimelineProps) {
	return (
		<div className={`relative ${className}`}>
			{/* Vertical connecting line */}
			<div className="absolute top-0 bottom-0 left-6 w-0.5 bg-default-200" />

			{/* Animated progress line */}
			<motion.div
				className="absolute top-0 left-6 w-0.5 bg-primary"
				initial={{ height: 0 }}
				animate={{ height: "100%" }}
				transition={{
					duration: 1.5,
					ease: "easeInOut",
					delay: 0.3,
				}}
			/>

			{/* Timeline items */}
			<div className="space-y-8">
				{items.map((item, index) => (
					<motion.div
						key={item.id}
						className="relative flex gap-6"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.5,
							delay: index * 0.2,
							ease: "easeOut",
						}}
					>
						{/* Icon/Dot */}
						<motion.div
							className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg"
							style={{
								backgroundColor: item.color || "var(--nextui-primary)",
							}}
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{
								type: "spring",
								stiffness: 200,
								damping: 15,
								delay: index * 0.2 + 0.3,
							}}
						>
							{item.icon ? (
								<div className="text-white">{item.icon}</div>
							) : (
								<motion.div
									className="h-3 w-3 rounded-full bg-white"
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{
										delay: index * 0.2 + 0.5,
										type: "spring",
										stiffness: 300,
										damping: 20,
									}}
								/>
							)}
						</motion.div>

						{/* Content */}
						<motion.div
							className="flex-1 rounded-xl border border-default-200 bg-default-50/50 p-6 backdrop-blur-sm"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.4,
								delay: index * 0.2 + 0.2,
								ease: "easeOut",
							}}
							whileHover={{
								y: -4,
								transition: { duration: 0.2 },
							}}
						>
							{/* Date */}
							<motion.p
								className="mb-2 font-medium text-primary text-sm"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: index * 0.2 + 0.4 }}
							>
								{item.date}
							</motion.p>

							{/* Title */}
							<motion.h3
								className="mb-2 font-semibold text-default-900 text-lg"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: index * 0.2 + 0.5 }}
							>
								{item.title}
							</motion.h3>

							{/* Description */}
							<motion.p
								className="text-default-600 text-sm leading-relaxed"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: index * 0.2 + 0.6 }}
							>
								{item.description}
							</motion.p>
						</motion.div>
					</motion.div>
				))}
			</div>
		</div>
	);
}
