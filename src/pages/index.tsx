import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatedComponentDialog } from "@/components/animated-component-dialog";
import { SplitText } from "@/components/ui/split-text";
import { categories, components } from "@/data/components";
import DefaultLayout from "@/layouts/default";

// Container variant for staggered children animation
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.6,
		},
	},
};

// Bokeh circle configurations for landing page
const bokehCircles = [
	{
		size: 150,
		color: "from-purple-500/30 to-pink-500/30",
		x: "8%",
		y: "15%",
		delay: 0,
		duration: 12,
	},
	{
		size: 100,
		color: "from-blue-500/25 to-cyan-500/25",
		x: "75%",
		y: "10%",
		delay: 1,
		duration: 15,
	},
	{
		size: 130,
		color: "from-pink-500/30 to-rose-500/30",
		x: "90%",
		y: "65%",
		delay: 2,
		duration: 14,
	},
	{
		size: 80,
		color: "from-yellow-500/20 to-orange-500/20",
		x: "12%",
		y: "75%",
		delay: 3,
		duration: 11,
	},
	{
		size: 120,
		color: "from-green-500/25 to-teal-500/25",
		x: "50%",
		y: "50%",
		delay: 4,
		duration: 16,
	},
	{
		size: 90,
		color: "from-indigo-500/30 to-purple-500/30",
		x: "28%",
		y: "35%",
		delay: 5,
		duration: 13,
	},
	{
		size: 140,
		color: "from-rose-500/25 to-pink-500/25",
		x: "65%",
		y: "85%",
		delay: 6,
		duration: 15,
	},
	{
		size: 70,
		color: "from-cyan-500/20 to-blue-500/20",
		x: "85%",
		y: "25%",
		delay: 7,
		duration: 14,
	},
	{
		size: 110,
		color: "from-purple-500/25 to-indigo-500/25",
		x: "40%",
		y: "20%",
		delay: 8,
		duration: 17,
	},
	{
		size: 95,
		color: "from-pink-500/20 to-purple-500/20",
		x: "20%",
		y: "60%",
		delay: 9,
		duration: 13,
	},
];

export default function IndexPage() {
	const { scrollYProgress } = useScroll();
	const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({
				x: (e.clientX / window.innerWidth - 0.5) * 20,
				y: (e.clientY / window.innerHeight - 0.5) * 20,
			});
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<DefaultLayout>
			{/* Animated Background */}
			<div className="pointer-events-none fixed inset-0 overflow-hidden">
				{/* Bokeh Circles */}
				{bokehCircles.map((circle, index) => (
					<motion.div
						key={index}
						className={`pointer-events-none absolute rounded-full bg-linear-to-br ${circle.color} blur-3xl`}
						style={{
							width: circle.size,
							height: circle.size,
							left: circle.x,
							top: circle.y,
						}}
						animate={{
							x: [0, 40, -30, 0],
							y: [0, -50, 30, 0],
							scale: [1, 1.3, 0.9, 1],
							opacity: [0.4, 0.7, 0.3, 0.4],
						}}
						transition={{
							duration: circle.duration,
							delay: circle.delay,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
				))}

				{/* Parallax effect on mouse move */}
				<motion.div
					className="absolute inset-0"
					animate={{
						x: mousePosition.x,
						y: mousePosition.y,
					}}
					transition={{ type: "spring", stiffness: 50, damping: 20 }}
				>
					<div className="absolute top-[40%] left-[30%] h-2 w-2 rounded-full bg-primary/30" />
					<div className="absolute top-[30%] left-[70%] h-3 w-3 rounded-full bg-secondary/20" />
					<div className="absolute top-[70%] left-[50%] h-2 w-2 rounded-full bg-success/25" />
					<div className="absolute top-[80%] left-[20%] h-1 w-1 rounded-full bg-primary/40" />
					<div className="absolute top-[50%] left-[80%] h-2 w-2 rounded-full bg-secondary/30" />
				</motion.div>
			</div>

			<section className="container relative z-10 mx-auto px-4 py-12">
				{/* Hero Section */}
				<div className="relative mb-20 text-center">
					{/* Animated glow behind title */}
					<motion.div
						className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[300px] w-[600px] rounded-full bg-linear-to-r from-primary/20 via-secondary/20 to-success/20 blur-3xl"
						animate={{
							scale: [1, 1.2, 1],
							opacity: [0.3, 0.5, 0.3],
						}}
						transition={{
							duration: 4,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>

					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className="relative"
					>
						<SplitText
							text="UI Component Showcase"
							className="mb-6 bg-linear-to-r from-primary via-secondary to-success bg-clip-text font-bold text-5xl text-transparent md:text-7xl"
							delay={0}
							duration={0.02}
						/>
					</motion.div>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className="mx-auto max-w-2xl text-default-600 text-lg md:text-xl"
					>
						Explore my collection of beautifully crafted, animated UI
						components. Click any card to see the component in action and view
						the code.
					</motion.p>

					{/* Floating badges */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.5 }}
						className="mt-8 flex flex-wrap items-center justify-center gap-3"
					>
						{["Framer Motion", "TypeScript", "React", "Tailwind"].map(
							(tech, i) => (
								<motion.span
									key={tech}
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.7 + i * 0.1 }}
									whileHover={{ scale: 1.1, y: -2 }}
									className="rounded-full border border-default-200 bg-default-50/50 px-4 py-2 font-medium text-default-700 text-sm backdrop-blur-sm"
								>
									{tech}
								</motion.span>
							),
						)}
					</motion.div>
				</div>

				{/* Categories */}
				{categories.map((category, categoryIndex) => {
					const categoryComponents = components.filter(
						(c) => c.category === category.id,
					);

					if (categoryComponents.length === 0) return null;

					return (
						<motion.div
							key={category.id}
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-100px" }}
							transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
							className="mb-20"
						>
							{/* Category Header */}
							<div className="mb-10 text-center">
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5 }}
									className="relative inline-block"
								>
									<h2 className="relative bg-linear-to-r from-default-900 to-default-600 bg-clip-text font-bold text-4xl text-transparent leading-snug md:text-5xl">
										{category.name}
									</h2>
									<motion.div
										className="-bottom-2 absolute left-0 h-1 rounded-full bg-linear-to-r from-primary via-secondary to-success"
										initial={{ width: 0 }}
										whileInView={{ width: "100%" }}
										viewport={{ once: true }}
										transition={{ duration: 0.8, delay: 0.2 }}
									/>
								</motion.div>
								<motion.p
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ delay: 0.3 }}
									className="mt-4 text-default-600 text-lg"
								>
									{category.description}
								</motion.p>
							</div>

							{/* Component Grid with Stagger */}
							<motion.div
								variants={containerVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, margin: "-50px" }}
								className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
							>
								{categoryComponents.map((component) => (
									<AnimatedComponentDialog
										key={component.id}
										component={component}
									/>
								))}
							</motion.div>
						</motion.div>
					);
				})}
			</section>
		</DefaultLayout>
	);
}
