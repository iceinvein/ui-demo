import { motion } from "framer-motion";
import { ArrowDown, CheckCircle, Sparkles, Star, Zap } from "lucide-react";
import { ScrollReveal } from "./ui/scroll-reveal";

const stats = [
	{ label: "Components", value: "47+", color: "from-violet-500 to-purple-600" },
	{ label: "Animations", value: "120+", color: "from-blue-500 to-cyan-600" },
	{ label: "Downloads", value: "8.4k", color: "from-emerald-500 to-teal-600" },
];

const features = [
	{ icon: Zap, label: "Lightning fast performance" },
	{ icon: Star, label: "Smooth 60fps animations" },
	{ icon: CheckCircle, label: "Accessible by default" },
	{ icon: Sparkles, label: "Fully customizable" },
];

export function ScrollRevealDemo() {
	return (
		<div className="min-h-[800px] overflow-y-auto">
			<div className="mx-auto max-w-2xl space-y-24 px-6 py-10">
				{/* Scroll hint */}
				<div className="flex flex-col items-center gap-3 py-4 text-center">
					<p className="font-semibold text-default-700 text-lg">
						Scroll to reveal
					</p>
					<p className="max-w-xs text-default-500 text-sm">
						Each section animates into view as it enters the viewport using{" "}
						<code className="rounded bg-default-100 px-1 py-0.5 font-mono text-default-600 text-xs">
							whileInView
						</code>
					</p>
					<motion.div
						className="mt-2 flex items-center gap-1.5 text-default-400 text-sm"
						animate={{ y: [0, 8, 0] }}
						transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
					>
						<ArrowDown className="h-4 w-4" />
						<span>Scroll down</span>
					</motion.div>
				</div>

				{/* Heading — slides up */}
				<ScrollReveal direction="up">
					<div className="text-center">
						<p className="mb-3 font-medium text-default-500 text-sm uppercase tracking-widest">
							Scroll Reveal
						</p>
						<h2 className="mb-4 bg-linear-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-4xl text-transparent leading-tight">
							Animate on scroll,
							<br />
							built for React
						</h2>
						<p className="mx-auto max-w-sm text-base text-default-500 leading-relaxed">
							A lightweight wrapper around Framer Motion's{" "}
							<code className="rounded bg-default-100 px-1 font-mono text-xs">
								whileInView
							</code>{" "}
							that makes scroll-triggered reveals effortless.
						</p>
					</div>
				</ScrollReveal>

				{/* Stat cards — stagger in from below */}
				<div className="grid grid-cols-3 gap-4">
					{stats.map((stat, i) => (
						<ScrollReveal key={stat.label} direction="up" delay={i * 0.12}>
							<div className="flex flex-col items-center gap-2 rounded-2xl border border-default-200/60 bg-default-50/50 p-6 text-center shadow-sm backdrop-blur-sm dark:border-default-700/40 dark:bg-default-900/30">
								<span
									className={`bg-linear-to-br ${stat.color} bg-clip-text font-bold text-3xl text-transparent`}
								>
									{stat.value}
								</span>
								<span className="text-default-500 text-sm">{stat.label}</span>
							</div>
						</ScrollReveal>
					))}
				</div>

				{/* Paragraph — slides from left */}
				<ScrollReveal direction="left">
					<div className="rounded-2xl border border-blue-200/50 bg-linear-to-br from-blue-500/5 to-cyan-500/5 p-7 dark:border-blue-700/30">
						<p className="font-medium text-default-500 text-xs uppercase tracking-wider">
							How it works
						</p>
						<p className="mt-3 text-base text-default-700 leading-relaxed dark:text-default-300">
							The{" "}
							<code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-blue-700 text-sm dark:bg-blue-900/50 dark:text-blue-300">
								ScrollReveal
							</code>{" "}
							component uses Framer Motion's{" "}
							<code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-blue-700 text-sm dark:bg-blue-900/50 dark:text-blue-300">
								whileInView
							</code>{" "}
							prop to detect when an element enters the viewport. Pass a{" "}
							<code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-blue-700 text-sm dark:bg-blue-900/50 dark:text-blue-300">
								direction
							</code>
							, optional{" "}
							<code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-blue-700 text-sm dark:bg-blue-900/50 dark:text-blue-300">
								delay
							</code>
							, and any{" "}
							<code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-blue-700 text-sm dark:bg-blue-900/50 dark:text-blue-300">
								className
							</code>{" "}
							— the rest is handled automatically with a smooth ease-out quart
							curve.
						</p>
					</div>
				</ScrollReveal>

				{/* Image placeholder — fades in */}
				<ScrollReveal direction="up" duration={0.8}>
					<div className="relative overflow-hidden rounded-2xl border border-default-200/60 dark:border-default-700/40">
						<div className="flex h-52 items-center justify-center bg-linear-to-br from-violet-500/10 via-purple-500/10 to-pink-500/10">
							<div className="pointer-events-none absolute inset-0 opacity-30">
								<div className="absolute top-4 left-6 h-24 w-24 rounded-full bg-violet-400 blur-2xl" />
								<div className="absolute right-10 bottom-6 h-32 w-32 rounded-full bg-pink-400 blur-2xl" />
								<div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-20 w-20 rounded-full bg-purple-400 blur-xl" />
							</div>
							<div className="relative flex flex-col items-center gap-2 text-default-400">
								<div className="flex h-14 w-14 items-center justify-center rounded-xl border border-default-200/80 bg-white/60 shadow-sm backdrop-blur-sm dark:border-default-700/50 dark:bg-default-800/60">
									<Sparkles className="h-6 w-6 text-violet-500" />
								</div>
								<span className="text-sm">Image placeholder</span>
							</div>
						</div>
					</div>
				</ScrollReveal>

				{/* Feature list — slides from right */}
				<div className="space-y-3">
					<ScrollReveal direction="right" delay={0}>
						<p className="font-semibold text-default-600 text-sm uppercase tracking-wider">
							Features
						</p>
					</ScrollReveal>
					{features.map((feature, i) => (
						<ScrollReveal key={feature.label} direction="right" delay={i * 0.1}>
							<div className="flex items-center gap-4 rounded-xl border border-default-200/60 bg-default-50/50 p-4 dark:border-default-700/40 dark:bg-default-900/30">
								<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-violet-500/20 to-purple-500/20">
									<feature.icon className="h-4 w-4 text-violet-500" />
								</div>
								<span className="text-default-700 text-sm dark:text-default-300">
									{feature.label}
								</span>
							</div>
						</ScrollReveal>
					))}
				</div>

				{/* CTA — slides up */}
				<ScrollReveal direction="up" delay={0.05}>
					<div className="rounded-2xl bg-linear-to-br from-violet-600 to-purple-700 p-8 text-center shadow-lg shadow-violet-500/20">
						<h3 className="mb-2 font-bold text-white text-xl">
							Ready to get started?
						</h3>
						<p className="mb-6 text-sm text-violet-200">
							Drop{" "}
							<code className="rounded bg-white/20 px-1.5 py-0.5 font-mono text-white text-xs">
								ScrollReveal
							</code>{" "}
							around any element and scroll to see it come alive.
						</p>
						<div className="flex justify-center gap-3">
							<div className="rounded-lg bg-white px-5 py-2.5 font-semibold text-purple-700 text-sm shadow-sm">
								View Source
							</div>
							<div className="rounded-lg border border-white/30 px-5 py-2.5 font-semibold text-sm text-white">
								Explore Docs
							</div>
						</div>
					</div>
				</ScrollReveal>

				{/* Bottom padding so last item fully scrolls into view */}
				<div className="h-12" />
			</div>
		</div>
	);
}
