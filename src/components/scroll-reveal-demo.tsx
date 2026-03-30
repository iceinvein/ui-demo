import { motion } from "framer-motion";
import {
	ArrowDown,
	Clock,
	Code2,
	Eye,
	Layers,
	MousePointer2,
	Zap,
} from "lucide-react";
import { ScrollReveal } from "./ui/scroll-reveal";

export function ScrollRevealDemo() {
	return (
		<div className="min-h-[800px] overflow-y-auto">
			<div className="mx-auto max-w-2xl space-y-28 px-6 py-10">
				{/* Scroll hint */}
				<div className="flex flex-col items-center gap-3 py-4 text-center">
					<p className="font-medium text-default-600 text-sm">
						Scroll to reveal each section
					</p>
					<motion.div
						className="text-default-400"
						animate={{ y: [0, 8, 0] }}
						transition={{
							duration: 1.6,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					>
						<ArrowDown className="h-5 w-5" />
					</motion.div>
				</div>

				{/* ── 1. Hero headline — slides up ── */}
				<ScrollReveal direction="up">
					<div className="text-center">
						<h2 className="mb-4 font-bold text-[clamp(2rem,1.5rem+2.5vw,3rem)] text-default-900 leading-[1.1] tracking-tight">
							Every element
							<br />
							<span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
								earns its entrance.
							</span>
						</h2>
						<p className="mx-auto max-w-sm text-default-400 text-sm leading-relaxed">
							Four directions. Configurable delay and duration. One component.
						</p>
					</div>
				</ScrollReveal>

				{/* ── 2. Direction showcase — 4 cards from 4 directions ── */}
				<div className="grid grid-cols-2 gap-4">
					{(
						[
							{ dir: "up", label: "Up", icon: "↑" },
							{ dir: "down", label: "Down", icon: "↓" },
							{ dir: "left", label: "Left", icon: "←" },
							{ dir: "right", label: "Right", icon: "→" },
						] as const
					).map((item, i) => (
						<ScrollReveal
							key={item.dir}
							direction={item.dir}
							delay={i * 0.08}
						>
							<div className="flex items-center gap-3 rounded-xl border border-default-200/50 bg-default-50/50 p-4">
								<span className="flex h-10 w-10 items-center justify-center rounded-lg bg-default-100 font-mono text-default-500 text-lg">
									{item.icon}
								</span>
								<div>
									<p className="font-medium text-default-800 text-sm">
										{item.label}
									</p>
									<p className="text-default-400 text-xs">
										direction="{item.dir}"
									</p>
								</div>
							</div>
						</ScrollReveal>
					))}
				</div>

				{/* ── 3. Performance metrics — staggered from below ── */}
				<div className="grid grid-cols-3 gap-3">
					{[
						{
							value: "0",
							unit: "deps",
							label: "Zero dependencies",
							icon: Layers,
						},
						{
							value: "<1",
							unit: "kb",
							label: "Bundle size",
							icon: Zap,
						},
						{
							value: "60",
							unit: "fps",
							label: "Butter smooth",
							icon: Eye,
						},
					].map((stat, i) => (
						<ScrollReveal key={stat.label} direction="up" delay={i * 0.1}>
							<div className="flex flex-col items-center gap-2 rounded-xl border border-default-200/40 p-5 text-center">
								<stat.icon className="h-4 w-4 text-default-400" />
								<div>
									<span className="font-bold text-2xl text-default-900 tabular-nums">
										{stat.value}
									</span>
									<span className="ml-0.5 text-default-400 text-xs">
										{stat.unit}
									</span>
								</div>
								<span className="text-default-400 text-xs">{stat.label}</span>
							</div>
						</ScrollReveal>
					))}
				</div>

				{/* ── 4. Code block — slides from left ── */}
				<ScrollReveal direction="left">
					<div className="overflow-hidden rounded-xl border border-default-200/40">
						<div className="flex items-center gap-2 border-default-200/40 border-b bg-default-100/50 px-4 py-2.5">
							<Code2 className="h-3.5 w-3.5 text-default-400" />
							<span className="font-mono text-default-500 text-xs">
								usage.tsx
							</span>
						</div>
						<pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
							<code>
								<span className="text-violet-400">{"<"}</span>
								<span className="text-emerald-400">ScrollReveal</span>
								{"\n"}
								{"  "}
								<span className="text-sky-400">direction</span>
								<span className="text-default-500">{"="}</span>
								<span className="text-amber-400">"up"</span>
								{"\n"}
								{"  "}
								<span className="text-sky-400">delay</span>
								<span className="text-default-500">{"={"}</span>
								<span className="text-orange-400">0.2</span>
								<span className="text-default-500">{"}"}</span>
								{"\n"}
								{"  "}
								<span className="text-sky-400">duration</span>
								<span className="text-default-500">{"={"}</span>
								<span className="text-orange-400">0.6</span>
								<span className="text-default-500">{"}"}</span>
								{"\n"}
								<span className="text-violet-400">{">"}</span>
								{"\n"}
								{"  "}
								<span className="text-default-500">
									{"<"}
									<span className="text-pink-400">YourComponent</span>
									{" />"}
								</span>
								{"\n"}
								<span className="text-violet-400">{"</"}</span>
								<span className="text-emerald-400">ScrollReveal</span>
								<span className="text-violet-400">{">"}</span>
							</code>
						</pre>
					</div>
				</ScrollReveal>

				{/* ── 5. Feature list — stagger from right ── */}
				<div className="space-y-3">
					{[
						{
							icon: MousePointer2,
							title: "Viewport triggered",
							desc: "Fires once when element enters view — no repeat jank",
						},
						{
							icon: Zap,
							title: "GPU accelerated",
							desc: "Only animates transform and opacity — stays on compositor",
						},
						{
							icon: Clock,
							title: "Stagger friendly",
							desc: "Pass incremental delays for sequential entrance effects",
						},
						{
							icon: Eye,
							title: "Reduced motion aware",
							desc: "Respects prefers-reduced-motion automatically",
						},
					].map((feature, i) => (
						<ScrollReveal
							key={feature.title}
							direction="right"
							delay={i * 0.08}
						>
							<div className="flex gap-4 rounded-xl border border-default-200/40 p-4">
								<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-default-100/80">
									<feature.icon className="h-4 w-4 text-default-500" />
								</div>
								<div>
									<p className="font-medium text-default-800 text-sm">
										{feature.title}
									</p>
									<p className="mt-0.5 text-default-400 text-xs leading-relaxed">
										{feature.desc}
									</p>
								</div>
							</div>
						</ScrollReveal>
					))}
				</div>

				{/* ── 6. CTA — slides up ── */}
				<ScrollReveal direction="up">
					<div className="rounded-2xl bg-gradient-to-br from-default-100 to-default-50 p-8 text-center dark:from-default-100/10 dark:to-default-50/5">
						<p className="mb-2 font-semibold text-default-900 text-lg">
							3 props. Any content. Done.
						</p>
						<p className="text-default-400 text-sm">
							Wrap anything in{" "}
							<code className="rounded bg-default-200/60 px-1.5 py-0.5 font-mono text-xs dark:bg-default-800/60">
								{"<ScrollReveal>"}
							</code>{" "}
							and let the viewport do the work.
						</p>
					</div>
				</ScrollReveal>

				<div className="h-8" />
			</div>
		</div>
	);
}
