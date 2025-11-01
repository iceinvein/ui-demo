import { motion } from "framer-motion";
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

export default function IndexPage() {
	return (
		<DefaultLayout>
			<section className="container mx-auto px-4 py-12">
				{/* Hero Section */}
				<div className="mb-16 text-center">
					<SplitText
						text="UI Component Showcase"
						className="mb-4 bg-gradient-to-r from-primary via-secondary to-success bg-clip-text font-bold text-5xl text-transparent md:text-6xl"
						delay={0}
						duration={0.02}
					/>
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
				</div>

				{/* Categories */}
				{categories.map((category) => {
					const categoryComponents = components.filter(
						(c) => c.category === category.id,
					);

					if (categoryComponents.length === 0) return null;

					return (
						<div key={category.id} className="mb-16">
							{/* Category Header */}
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="mb-8"
							>
								<h2 className="mb-2 font-bold text-3xl text-default-900">
									{category.name}
								</h2>
								<p className="text-default-600 text-lg">
									{category.description}
								</p>
							</motion.div>

							{/* Component Grid with Stagger */}
							<motion.div
								variants={containerVariants}
								initial="hidden"
								animate="visible"
								className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
							>
								{categoryComponents.map((component) => (
									<AnimatedComponentDialog
										key={component.id}
										component={component}
									/>
								))}
							</motion.div>
						</div>
					);
				})}
			</section>
		</DefaultLayout>
	);
}
