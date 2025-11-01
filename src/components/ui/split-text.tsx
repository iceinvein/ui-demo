import { motion } from "framer-motion";

interface SplitTextProps {
	text: string;
	className?: string;
	delay?: number;
	duration?: number;
	as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function SplitText({
	text,
	className = "",
	delay = 0,
	duration = 0.05,
	as = "h1",
}: SplitTextProps) {
	// Split text into words
	const words = text.split(" ");

	// Container animation
	const container = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: { staggerChildren: duration, delayChildren: delay * i },
		}),
	};

	// Child animation (each character)
	const child = {
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 200,
			},
		},
		hidden: {
			opacity: 0,
			y: 20,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 200,
			},
		},
	};

	const MotionComponent = motion[as];

	return (
		<MotionComponent
			className={className}
			variants={container}
			initial="hidden"
			animate="visible"
		>
			{words.map((word, wordIndex) => (
				<span
					key={`word-${wordIndex}`}
					style={{ display: "inline-block", marginRight: "0.25em" }}
				>
					{word.split("").map((char, charIndex) => (
						<motion.span
							key={`char-${wordIndex}-${charIndex}`}
							variants={child}
							style={{ display: "inline-block" }}
						>
							{char}
						</motion.span>
					))}
				</span>
			))}
		</MotionComponent>
	);
}
