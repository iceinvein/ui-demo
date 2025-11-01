import { motion } from "framer-motion";
import { AnimatedComponentDialog } from "@/components/animated-component-dialog";
import { categories, components } from "@/data/components";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
	return (
		<DefaultLayout>
			<section className="container mx-auto px-4 py-12">
				{/* Hero Section */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-16 text-center"
				>
					<h1 className="mb-4 bg-gradient-to-r from-primary via-secondary to-success bg-clip-text font-bold text-5xl text-transparent md:text-6xl">
						UI Component Showcase
					</h1>
					<p className="mx-auto max-w-2xl text-default-600 text-lg md:text-xl">
						Explore my collection of beautifully crafted, animated UI
						components. Click any card to see the component in action and view
						the code.
					</p>
				</motion.div>

				{/* Categories */}
				{categories.map((category) => {
					const categoryComponents = components.filter(
						(c) => c.category === category.id,
					);

					if (categoryComponents.length === 0) return null;

					return (
						<motion.div
							key={category.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="mb-16"
						>
							{/* Category Header */}
							<div className="mb-8">
								<h2 className="mb-2 font-bold text-3xl text-default-900">
									{category.name}
								</h2>
								<p className="text-default-600 text-lg">
									{category.description}
								</p>
							</div>

							{/* Component Grid */}
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
								{categoryComponents.map((component, index) => (
									<AnimatedComponentDialog
										key={component.id}
										component={component}
										index={index}
									/>
								))}
							</div>
						</motion.div>
					);
				})}
			</section>
		</DefaultLayout>
	);
}
