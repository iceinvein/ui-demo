import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

export interface GridItem {
	id: string;
	content: ReactNode;
	height?: number; // For masonry layout
}

interface StaggeredGridProps {
	items: GridItem[];
	columns?: number;
	gap?: number;
	staggerDelay?: number;
	animationDuration?: number;
	className?: string;
	masonry?: boolean; // Enable masonry layout
}

export function StaggeredGrid({
	items,
	columns = 3,
	gap = 4,
	staggerDelay = 0.1,
	animationDuration = 0.5,
	className = "",
	masonry = false,
}: StaggeredGridProps) {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: staggerDelay,
			},
		},
	};

	const itemVariants = {
		hidden: {
			opacity: 0,
			y: 20,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: animationDuration,
				ease: [0.0, 0.0, 0.2, 1.0] as const,
			},
		},
		exit: {
			opacity: 0,
			scale: 0.9,
			transition: {
				duration: 0.2,
			},
		},
	};

	if (masonry) {
		return (
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className={className}
				style={{
					columnCount: columns,
					columnGap: `${gap * 0.25}rem`,
				}}
			>
				<AnimatePresence mode="popLayout">
					{items.map((item) => (
						<motion.div
							key={item.id}
							layout
							variants={itemVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							whileHover={{
								scale: 1.02,
								transition: { duration: 0.2 },
							}}
							className="cursor-pointer break-inside-avoid"
							style={{
								marginBottom: `${gap * 0.25}rem`,
							}}
						>
							{item.content}
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>
		);
	}

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className={className}
			style={{
				display: "grid",
				gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
				gap: `${gap * 0.25}rem`,
			}}
		>
			<AnimatePresence mode="popLayout">
				{items.map((item) => (
					<motion.div
						key={item.id}
						layout
						variants={itemVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						whileHover={{
							scale: 1.05,
							transition: { duration: 0.2 },
						}}
						whileTap={{ scale: 0.95 }}
						className="cursor-pointer"
					>
						{item.content}
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	);
}
