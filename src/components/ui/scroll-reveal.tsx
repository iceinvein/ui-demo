import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

type ScrollRevealProps = {
	children: ReactNode;
	direction?: Direction;
	delay?: number;
	duration?: number;
	className?: string;
};

function getInitialState(direction: Direction) {
	const offset = 40;
	switch (direction) {
		case "up":
			return { y: offset, x: 0, opacity: 0 };
		case "down":
			return { y: -offset, x: 0, opacity: 0 };
		case "left":
			return { y: 0, x: offset, opacity: 0 };
		case "right":
			return { y: 0, x: -offset, opacity: 0 };
	}
}

export function ScrollReveal({
	children,
	direction = "up",
	delay = 0,
	duration = 0.6,
	className,
}: ScrollRevealProps) {
	const initial = getInitialState(direction);

	return (
		<motion.div
			className={className}
			initial={initial}
			whileInView={{ y: 0, x: 0, opacity: 1 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{
				duration,
				delay,
				ease: [0.25, 1, 0.5, 1],
			}}
		>
			{children}
		</motion.div>
	);
}
