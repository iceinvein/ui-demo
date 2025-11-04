import { motion, useScroll, useTransform } from "framer-motion";
import {
	ArrowDown,
	Heart,
	Layers,
	Rocket,
	Sparkles,
	Star,
	Target,
	Trophy,
	Zap,
} from "lucide-react";
import { useEffect, useRef } from "react";

export function ScrollParallaxDemo() {
	const contentRef = useRef<HTMLDivElement>(null);
	const scrollContainerRef = useRef<HTMLElement | null>(null);

	// Find the dialog's scroll container (the parent with overflow-y-auto)
	useEffect(() => {
		if (contentRef.current && !scrollContainerRef.current) {
			let element = contentRef.current.parentElement;
			while (element) {
				const overflow = window.getComputedStyle(element).overflowY;
				if (overflow === "auto" || overflow === "scroll") {
					scrollContainerRef.current = element;
					break;
				}
				element = element.parentElement;
			}
		}
	}, []);

	// Track scroll progress within the dialog's scroll container
	const { scrollYProgress } = useScroll({
		container: scrollContainerRef,
	});

	// Transform scroll progress to different values for parallax layers
	const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -300]);
	const middleY = useTransform(scrollYProgress, [0, 1], [0, -600]);
	const foregroundY = useTransform(scrollYProgress, [0, 1], [0, -900]);

	// Transform for opacity and scale effects
	const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
	const opacity2 = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
	const opacity3 = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
	const opacity4 = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
	const opacity5 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
	const opacity6 = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);

	const scale1 = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
	const scale2 = useTransform(scrollYProgress, [0.1, 0.2], [0.8, 1]);
	const scale3 = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1]);
	const scale4 = useTransform(scrollYProgress, [0.45, 0.65], [0.8, 1]);
	const scale5 = useTransform(scrollYProgress, [0.6, 0.8], [0.8, 1]);
	const scale6 = useTransform(scrollYProgress, [0.75, 0.95], [0.8, 1]);

	// Rotation effects
	const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
	const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -360]);

	// Slide effects
	const slideLeft = useTransform(scrollYProgress, [0.1, 0.2], [-200, 0]);
	const slideRight = useTransform(scrollYProgress, [0.1, 0.2], [200, 0]);

	return (
		<div ref={contentRef} className="relative w-full">
			{/* Scroll Progress Indicator - Sticky at top */}
			<motion.div
				className="sticky top-0 z-60 h-1 bg-linear-to-r from-purple-500 via-pink-500 to-rose-500"
				style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
			/>

			{/* Parallax Content - No nested scroll container */}
			<div className="relative min-h-[3600px]">
				{/* Background Layer - Slowest */}
				<motion.div
					className="absolute inset-x-0 top-0"
					style={{ y: backgroundY }}
				>
					<div className="absolute top-[100px] left-[10%] h-64 w-64 rounded-full bg-linear-to-br from-purple-500/20 to-pink-500/20 blur-3xl" />
					<div className="absolute top-[400px] right-[15%] h-80 w-80 rounded-full bg-linear-to-br from-blue-500/20 to-cyan-500/20 blur-3xl" />
					<div className="absolute top-[800px] left-[20%] h-72 w-72 rounded-full bg-linear-to-br from-rose-500/20 to-orange-500/20 blur-3xl" />
					<div className="absolute top-[1200px] right-[30%] h-96 w-96 rounded-full bg-linear-to-br from-green-500/20 to-teal-500/20 blur-3xl" />
					<div className="absolute top-[1600px] left-[15%] h-80 w-80 rounded-full bg-linear-to-br from-yellow-500/20 to-orange-500/20 blur-3xl" />
					<div className="absolute top-[2000px] right-[20%] h-72 w-72 rounded-full bg-linear-to-br from-indigo-500/20 to-purple-500/20 blur-3xl" />
				</motion.div>

				{/* Middle Layer - Medium Speed */}
				<motion.div className="absolute inset-x-0 top-0" style={{ y: middleY }}>
					<div className="absolute top-[200px] left-[60%] h-48 w-48 rounded-full bg-linear-to-br from-cyan-500/30 to-teal-500/30 blur-2xl" />
					<div className="absolute top-[600px] left-[30%] h-56 w-56 rounded-full bg-linear-to-br from-pink-500/30 to-purple-500/30 blur-2xl" />
					<div className="absolute top-[1000px] right-[25%] h-64 w-64 rounded-full bg-linear-to-br from-orange-500/30 to-rose-500/30 blur-2xl" />
					<div className="absolute top-[1400px] left-[40%] h-52 w-52 rounded-full bg-linear-to-br from-blue-500/30 to-indigo-500/30 blur-2xl" />
					<div className="absolute top-[1800px] right-[35%] h-60 w-60 rounded-full bg-linear-to-br from-green-500/30 to-emerald-500/30 blur-2xl" />
				</motion.div>

				{/* Foreground Layer - Fastest */}
				<motion.div
					className="absolute inset-x-0 top-0"
					style={{ y: foregroundY }}
				>
					<div className="absolute top-[300px] left-[15%] h-32 w-32 rounded-full bg-linear-to-br from-purple-500/40 to-pink-500/40 blur-xl" />
					<div className="absolute top-[700px] right-[20%] h-40 w-40 rounded-full bg-linear-to-br from-blue-500/40 to-cyan-500/40 blur-xl" />
					<div className="absolute top-[1100px] left-[50%] h-36 w-36 rounded-full bg-linear-to-br from-rose-500/40 to-orange-500/40 blur-xl" />
					<div className="absolute top-[1500px] right-[40%] h-44 w-44 rounded-full bg-linear-to-br from-yellow-500/40 to-amber-500/40 blur-xl" />
					<div className="absolute top-[1900px] left-[25%] h-38 w-38 rounded-full bg-linear-to-br from-teal-500/40 to-cyan-500/40 blur-xl" />
				</motion.div>

				{/* Content Sections */}
				<div className="relative z-10">
					{/* Section 1 - Hero */}
					<motion.div
						className="flex h-[600px] flex-col items-center justify-center px-8 text-center"
						style={{ opacity: opacity1, scale: scale1 }}
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 200, damping: 20 }}
						>
							<Layers className="mb-6 h-20 w-20 text-purple-500" />
						</motion.div>
						<h2 className="mb-4 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-4xl text-transparent">
							Scroll Parallax
						</h2>
						<p className="mb-8 max-w-md text-default-600 text-lg">
							Multiple layers moving at different speeds create depth
						</p>
						<motion.div
							className="flex items-center gap-2 text-default-500 text-sm"
							animate={{ y: [0, 10, 0] }}
							transition={{ duration: 2, repeat: Infinity }}
						>
							<ArrowDown className="h-5 w-5" />
							<span>Scroll down to see the effect</span>
						</motion.div>
					</motion.div>

					{/* Section 2 - Sliding Cards */}
					<motion.div
						className="flex h-[600px] items-center justify-center gap-6 px-8"
						style={{ opacity: opacity2, scale: scale2 }}
					>
						<motion.div
							className="flex h-48 w-48 flex-col items-center justify-center rounded-2xl border border-default-200 bg-linear-to-br from-blue-500/10 to-cyan-500/10 p-6 shadow-lg backdrop-blur-sm"
							style={{ x: slideLeft }}
						>
							<Zap className="mb-3 h-12 w-12 text-blue-500" />
							<h4 className="font-bold text-default-900">Fast</h4>
							<p className="text-center text-default-600 text-sm">
								Lightning speed
							</p>
						</motion.div>
						<motion.div
							className="flex h-48 w-48 flex-col items-center justify-center rounded-2xl border border-default-200 bg-linear-to-br from-purple-500/10 to-pink-500/10 p-6 shadow-lg backdrop-blur-sm"
							style={{ scale: scale2 }}
						>
							<Star className="mb-3 h-12 w-12 text-purple-500" />
							<h4 className="font-bold text-default-900">Smooth</h4>
							<p className="text-center text-default-600 text-sm">
								Buttery animations
							</p>
						</motion.div>
						<motion.div
							className="flex h-48 w-48 flex-col items-center justify-center rounded-2xl border border-default-200 bg-linear-to-br from-pink-500/10 to-rose-500/10 p-6 shadow-lg backdrop-blur-sm"
							style={{ x: slideRight }}
						>
							<Heart className="mb-3 h-12 w-12 text-pink-500" />
							<h4 className="font-bold text-default-900">Beautiful</h4>
							<p className="text-center text-default-600 text-sm">
								Eye-catching design
							</p>
						</motion.div>
					</motion.div>

					{/* Section 3 - Rotating Icons */}
					<motion.div
						className="flex h-[600px] flex-col items-center justify-center px-8 text-center"
						style={{ opacity: opacity3, scale: scale3 }}
					>
						<div className="mb-6 flex gap-6">
							<motion.div style={{ rotate: rotate1 }}>
								<Rocket className="h-16 w-16 text-orange-500" />
							</motion.div>
							<motion.div style={{ rotate: rotate2 }}>
								<Trophy className="h-16 w-16 text-yellow-500" />
							</motion.div>
							<motion.div style={{ rotate: rotate1 }}>
								<Target className="h-16 w-16 text-green-500" />
							</motion.div>
						</div>
						<h3 className="mb-4 bg-linear-to-r from-orange-600 to-yellow-600 bg-clip-text font-bold text-3xl text-transparent">
							Rotating Elements
						</h3>
						<p className="max-w-md text-default-600">
							Icons rotate 360° as you scroll, creating dynamic motion
						</p>
					</motion.div>

					{/* Section 4 - Sparkles */}
					<motion.div
						className="flex h-[600px] flex-col items-center justify-center px-8 text-center"
						style={{ opacity: opacity4, scale: scale4 }}
					>
						<Sparkles className="mb-6 h-16 w-16 text-pink-500" />
						<h3 className="mb-4 bg-linear-to-r from-pink-600 to-rose-600 bg-clip-text font-bold text-3xl text-transparent">
							Dynamic Effects
						</h3>
						<p className="max-w-md text-default-600">
							Background layers move at different speeds, creating a beautiful
							parallax depth effect
						</p>
					</motion.div>

					{/* Section 5 - Staggered Icons */}
					<motion.div
						className="flex h-[600px] flex-col items-center justify-center px-8 text-center"
						style={{ opacity: opacity5, scale: scale5 }}
					>
						<div className="mb-6 grid grid-cols-3 gap-4">
							{[Star, Heart, Sparkles, Zap, Rocket, Trophy].map(
								(Icon, index) => (
									<motion.div
										key={index}
										className="flex h-20 w-20 items-center justify-center rounded-xl bg-linear-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm"
										initial={{ opacity: 0, scale: 0 }}
										whileInView={{ opacity: 1, scale: 1 }}
										transition={{ delay: index * 0.1 }}
										viewport={{ once: false }}
									>
										<Icon className="h-8 w-8 text-purple-500" />
									</motion.div>
								),
							)}
						</div>
						<h3 className="mb-4 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text font-bold text-3xl text-transparent">
							Staggered Animations
						</h3>
						<p className="max-w-md text-default-600">
							Elements appear one by one as they enter the viewport
						</p>
					</motion.div>

					{/* Section 6 - Final */}
					<motion.div
						className="flex h-[600px] flex-col items-center justify-center px-8 text-center"
						style={{ opacity: opacity6, scale: scale6 }}
					>
						<div className="mb-6 flex gap-4">
							<motion.div
								className="h-12 w-12 rounded-lg bg-linear-to-br from-purple-500 to-pink-500"
								animate={{ rotate: 360 }}
								transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
							/>
							<motion.div
								className="h-12 w-12 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500"
								animate={{ rotate: -360 }}
								transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
							/>
							<motion.div
								className="h-12 w-12 rounded-lg bg-linear-to-br from-rose-500 to-orange-500"
								animate={{ rotate: 360 }}
								transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
							/>
						</div>
						<h3 className="mb-4 bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text font-bold text-3xl text-transparent">
							Scroll to the Top!
						</h3>
						<p className="max-w-md text-default-600">
							Try scrolling back up to see the reverse effect
						</p>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
