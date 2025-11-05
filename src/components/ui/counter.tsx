import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

interface CounterProps {
	value: number;
	duration?: number;
	className?: string;
	prefix?: string;
	suffix?: string;
	decimals?: number;
	delay?: number;
}

export function Counter({
	value,
	duration = 2,
	className = "",
	prefix = "",
	suffix = "",
	decimals = 0,
	delay = 0,
}: CounterProps) {
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => {
		return latest.toFixed(decimals);
	});

	useEffect(() => {
		const controls = animate(count, value, {
			duration,
			delay,
			ease: "easeOut",
		});

		return controls.stop;
	}, [count, value, duration, delay]);

	return (
		<motion.span
			className={className}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay }}
		>
			{prefix}
			<motion.span>{rounded}</motion.span>
			{suffix}
		</motion.span>
	);
}

interface StatCardProps {
	label: string;
	value: number;
	prefix?: string;
	suffix?: string;
	decimals?: number;
	icon?: React.ReactNode;
	color?: string;
	delay?: number;
}

export function StatCard({
	label,
	value,
	prefix = "",
	suffix = "",
	decimals = 0,
	icon,
	color = "var(--nextui-primary)",
	delay = 0,
}: StatCardProps) {
	return (
		<motion.div
			className="group relative overflow-hidden rounded-2xl border border-default-200 bg-default-50/50 p-6 backdrop-blur-sm"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay }}
			whileHover={{
				y: -4,
				transition: { duration: 0.2 },
			}}
		>
			{/* Animated gradient background on hover */}
			<motion.div
				className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{
					background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
				}}
			/>

			<div className="relative z-10">
				{/* Icon */}
				{icon && (
					<motion.div
						className="mb-4 inline-flex rounded-xl p-3"
						style={{
							backgroundColor: `${color}20`,
							color: color,
						}}
						initial={{ scale: 0, rotate: -180 }}
						animate={{ scale: 1, rotate: 0 }}
						transition={{
							type: "spring",
							stiffness: 200,
							damping: 15,
							delay: delay + 0.2,
						}}
					>
						{icon}
					</motion.div>
				)}

				{/* Value */}
				<Counter
					value={value}
					prefix={prefix}
					suffix={suffix}
					decimals={decimals}
					duration={2}
					delay={delay + 0.3}
					className="mb-2 block font-bold text-4xl text-default-900"
				/>

				{/* Label */}
				<motion.p
					className="text-default-600 text-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: delay + 0.5 }}
				>
					{label}
				</motion.p>
			</div>

			{/* Decorative corner accent */}
			<motion.div
				className="absolute top-0 right-0 h-20 w-20 rounded-bl-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				style={{
					background: `radial-gradient(circle at top right, ${color}15, transparent)`,
				}}
			/>
		</motion.div>
	);
}
