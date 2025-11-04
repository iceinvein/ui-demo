import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function BokehDemo() {
	// Bokeh circle configurations
	const bokehCircles = [
		{
			size: 120,
			color: "from-purple-500/40 to-pink-500/40",
			x: "10%",
			y: "20%",
			delay: 0,
			duration: 8,
		},
		{
			size: 80,
			color: "from-blue-500/40 to-cyan-500/40",
			x: "70%",
			y: "15%",
			delay: 0.5,
			duration: 10,
		},
		{
			size: 100,
			color: "from-pink-500/40 to-rose-500/40",
			x: "85%",
			y: "60%",
			delay: 1,
			duration: 9,
		},
		{
			size: 60,
			color: "from-yellow-500/40 to-orange-500/40",
			x: "15%",
			y: "70%",
			delay: 1.5,
			duration: 7,
		},
		{
			size: 90,
			color: "from-green-500/40 to-teal-500/40",
			x: "50%",
			y: "50%",
			delay: 2,
			duration: 11,
		},
		{
			size: 70,
			color: "from-indigo-500/40 to-purple-500/40",
			x: "30%",
			y: "40%",
			delay: 2.5,
			duration: 8.5,
		},
		{
			size: 110,
			color: "from-rose-500/40 to-pink-500/40",
			x: "60%",
			y: "80%",
			delay: 3,
			duration: 10.5,
		},
		{
			size: 50,
			color: "from-cyan-500/40 to-blue-500/40",
			x: "80%",
			y: "30%",
			delay: 3.5,
			duration: 9.5,
		},
	];

	return (
		<div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-default-200 bg-linear-to-br from-slate-900 to-slate-800">
			{/* Bokeh Circles */}
			{bokehCircles.map((circle, index) => (
				<motion.div
					key={index}
					className={`absolute rounded-full bg-linear-to-br ${circle.color} blur-2xl`}
					style={{
						width: circle.size,
						height: circle.size,
						left: circle.x,
						top: circle.y,
					}}
					animate={{
						x: [0, 30, -20, 0],
						y: [0, -40, 20, 0],
						scale: [1, 1.2, 0.9, 1],
						opacity: [0.6, 0.8, 0.5, 0.6],
					}}
					transition={{
						duration: circle.duration,
						delay: circle.delay,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			))}

			{/* Interactive Bokeh - follows cursor area */}
			<motion.div
				className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-32 w-32 rounded-full bg-linear-to-br from-purple-500/50 to-pink-500/50 blur-3xl"
				whileHover={{ scale: 1.5, opacity: 0.8 }}
				animate={{
					scale: [1, 1.1, 1],
					opacity: [0.4, 0.6, 0.4],
				}}
				transition={{
					duration: 4,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			{/* Content */}
			<div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
				<motion.div
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{
						type: "spring",
						stiffness: 200,
						damping: 20,
						delay: 0.2,
					}}
				>
					<Sparkles className="mb-6 h-20 w-20 text-purple-400" />
				</motion.div>

				<motion.h2
					className="mb-4 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text font-bold text-4xl text-transparent"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					Bokeh Effects
				</motion.h2>

				<motion.p
					className="mb-8 max-w-md text-default-400 text-lg"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
				>
					Soft, blurred circles floating with smooth animations
				</motion.p>

				<motion.div
					className="flex gap-4"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.8 }}
				>
					{[1, 2, 3].map((i) => (
						<motion.div
							key={i}
							className="h-3 w-3 rounded-full bg-linear-to-r from-purple-400 to-pink-400"
							animate={{
								scale: [1, 1.5, 1],
								opacity: [0.5, 1, 0.5],
							}}
							transition={{
								duration: 2,
								delay: i * 0.2,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
					))}
				</motion.div>

				<motion.p
					className="mt-8 text-default-500 text-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1 }}
				>
					Hover over the center for interaction
				</motion.p>
			</div>
		</div>
	);
}
