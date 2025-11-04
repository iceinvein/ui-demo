import { motion } from "framer-motion";

interface SpinnerProps {
	size?: "sm" | "md" | "lg";
	color?: string;
	className?: string;
}

/**
 * Classic Circular Spinner
 */
export function CircularSpinner({
	size = "md",
	color = "currentColor",
	className = "",
}: SpinnerProps) {
	const sizes = {
		sm: 16,
		md: 24,
		lg: 32,
	};

	const dimension = sizes[size];

	return (
		<motion.div
			className={className}
			animate={{ rotate: 360 }}
			transition={{
				duration: 1,
				repeat: Infinity,
				ease: "linear",
			}}
		>
			<svg
				width={dimension}
				height={dimension}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					cx="12"
					cy="12"
					r="10"
					stroke={color}
					strokeWidth="3"
					strokeOpacity="0.2"
				/>
				<path
					d="M12 2a10 10 0 0 1 10 10"
					stroke={color}
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</svg>
		</motion.div>
	);
}

/**
 * Dots Spinner (3 bouncing dots)
 */
export function DotsSpinner({
	size = "md",
	color = "currentColor",
	className = "",
}: SpinnerProps) {
	const sizes = {
		sm: 4,
		md: 6,
		lg: 8,
	};

	const dotSize = sizes[size];

	const dotVariants = {
		initial: { y: 0 },
		animate: { y: -10 },
	};

	return (
		<div className={`flex items-center gap-1 ${className}`}>
			{[0, 1, 2].map((i) => (
				<motion.div
					key={i}
					className="rounded-full"
					style={{
						width: dotSize,
						height: dotSize,
						backgroundColor: color,
					}}
					variants={dotVariants}
					initial="initial"
					animate="animate"
					transition={{
						duration: 0.5,
						repeat: Infinity,
						repeatType: "reverse",
						delay: i * 0.15,
					}}
				/>
			))}
		</div>
	);
}

/**
 * Bars Spinner (equalizer style)
 */
export function BarsSpinner({
	size = "md",
	color = "currentColor",
	className = "",
}: SpinnerProps) {
	const sizes = {
		sm: { width: 2, height: 16 },
		md: { width: 3, height: 24 },
		lg: { width: 4, height: 32 },
	};

	const { width, height } = sizes[size];

	return (
		<div className={`flex items-end gap-1 ${className}`} style={{ height }}>
			{[0, 1, 2, 3, 4].map((i) => (
				<motion.div
					key={i}
					className="rounded-sm"
					style={{
						width,
						backgroundColor: color,
					}}
					animate={{
						height: [height * 0.3, height, height * 0.3],
					}}
					transition={{
						duration: 1,
						repeat: Infinity,
						delay: i * 0.1,
						ease: "easeInOut",
					}}
				/>
			))}
		</div>
	);
}

/**
 * Grid Spinner (9 dots in a grid)
 */
export function GridSpinner({
	size = "md",
	color = "currentColor",
	className = "",
}: SpinnerProps) {
	const sizes = {
		sm: 2,
		md: 3,
		lg: 4,
	};

	const dotSize = sizes[size];

	return (
		<div className={`grid grid-cols-3 gap-1 ${className}`}>
			{Array.from({ length: 9 }).map((_, i) => (
				<motion.div
					key={i}
					className="rounded-full"
					style={{
						width: dotSize,
						height: dotSize,
						backgroundColor: color,
					}}
					animate={{
						scale: [1, 0.5, 1],
						opacity: [1, 0.3, 1],
					}}
					transition={{
						duration: 1.2,
						repeat: Infinity,
						delay: i * 0.1,
						ease: "easeInOut",
					}}
				/>
			))}
		</div>
	);
}
