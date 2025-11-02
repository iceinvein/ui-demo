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

// Floating orb component
function FloatingOrb({
	delay = 0,
	duration = 20,
	size = 400,
	color = "primary",
}: {
	delay?: number;
	duration?: number;
	size?: number;
	color?: string;
}) {
	return (
		<motion.div
			className="pointer-events-none absolute rounded-full blur-3xl"
			style={{
				width: size,
				height: size,
				background: `radial-gradient(circle, var(--nextui-${color}) 0%, transparent 70%)`,
			}}
			animate={{
				x: [0, 100, -50, 0],
				y: [0, -100, 50, 0],
				scale: [1, 1.2, 0.8, 1],
				opacity: [0.3, 0.5, 0.3, 0.3],
			}}
			transition={{
				duration,
				repeat: Number.POSITIVE_INFINITY,
				delay,
				ease: "easeInOut",
			}}
		/>
	);
}

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
				{/* Gradient Mesh */}
				<motion.div
					className="absolute inset-0 opacity-40"
					style={{
						y: backgroundY,
						background:
							"radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(34, 197, 94, 0.15) 0%, transparent 50%)",
					}}
				/>

				{/* Floating Orbs */}
				<div className="absolute top-[20%] left-[10%]">
					<FloatingOrb delay={0} duration={25} size={500} color="primary" />
				</div>
				<div className="absolute top-[60%] right-[15%]">
					<FloatingOrb delay={5} duration={30} size={400} color="secondary" />
				</div>
				<div className="absolute top-[10%] left-[60%]">
					<FloatingOrb delay={10} duration={28} size={350} color="success" />
				</div>

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
						className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[300px] w-[600px] rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-success/20 blur-3xl"
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
							className="mb-6 bg-gradient-to-r from-primary via-secondary to-success bg-clip-text font-bold text-5xl text-transparent md:text-7xl"
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
									<h2 className="relative mb-3 bg-gradient-to-r from-default-900 to-default-600 bg-clip-text font-bold text-4xl text-transparent md:text-5xl">
										{category.name}
									</h2>
									<motion.div
										className="-bottom-2 absolute left-0 h-1 rounded-full bg-gradient-to-r from-primary via-secondary to-success"
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
