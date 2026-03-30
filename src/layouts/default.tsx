import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/navbar";
import { components, categories } from "@/data/components";

// ── Animated counter that counts up when scrolled into view ─────────────────

function AnimatedCount({ target }: { target: number }) {
	const [inView, setInView] = useState(false);
	const ref = useRef<HTMLSpanElement>(null);
	const raw = useMotionValue(0);
	const spring = useSpring(raw, { stiffness: 80, damping: 20 });
	const [display, setDisplay] = useState(0);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "0px" },
		);
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (inView) raw.set(target);
	}, [inView, raw, target]);

	useEffect(() => {
		return spring.on("change", (v) => setDisplay(Math.round(v)));
	}, [spring]);

	return <span ref={ref}>{display}</span>;
}

// ── Gradient line that sweeps on scroll ─────────────────────────────────────

function AnimatedDivider() {
	const ref = useRef<HTMLDivElement>(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "0px" },
		);
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={ref} className="relative h-px w-full overflow-hidden">
			<motion.div
				className="absolute inset-y-0 left-0 w-full"
				initial={{ scaleX: 0 }}
				animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
				transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
				style={{
					transformOrigin: "center",
					background:
						"linear-gradient(90deg, transparent, var(--heroui-default-300, #d4d4d8) 30%, var(--heroui-default-300, #d4d4d8) 70%, transparent)",
				}}
			/>
		</div>
	);
}

// ── Category pill ───────────────────────────────────────────────────────────

function CategoryStat({
	name,
	count,
	delay,
}: { name: string; count: number; delay: number }) {
	return (
		<motion.span
			className="inline-flex items-center gap-1.5 text-default-400 text-xs"
			initial={{ opacity: 0, y: 6 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
		>
			<span className="tabular-nums text-default-500">{count}</span>
			{name}
		</motion.span>
	);
}

// ── Tech badge ──────────────────────────────────────────────────────────────

function TechBadge({
	label,
	delay,
}: { label: string; delay: number }) {
	return (
		<motion.span
			className="rounded-full border border-default-200/40 px-2.5 py-0.5 font-mono text-[10px] text-default-400 transition-colors hover:border-default-300 hover:text-default-500"
			initial={{ opacity: 0, scale: 0.9 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true }}
			transition={{ delay, type: "spring" as const, stiffness: 300, damping: 25 }}
		>
			{label}
		</motion.span>
	);
}

// ── Footer ──────────────────────────────────────────────────────────────────

function ShowcaseFooter() {
	const categoryData = categories.map((cat) => ({
		name: cat.name,
		count: components.filter((c) => c.category === cat.id).length,
	}));

	const techStack = ["React 19", "Framer Motion", "Tailwind CSS", "TypeScript"];

	return (
		<footer className="mx-auto w-full max-w-6xl px-4 pb-12 pt-20">
			<AnimatedDivider />

			<div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-[1fr_auto]">
				{/* Left column */}
				<div className="space-y-4">
					<motion.p
						className="font-['Instrument_Serif'] text-default-500 text-lg italic"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						UI Showcase
					</motion.p>

					{/* Component count */}
					<motion.p
						className="text-default-400 text-sm"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1, duration: 0.5 }}
					>
						<span className="font-semibold text-default-500 tabular-nums">
							<AnimatedCount target={components.length} />
						</span>{" "}
						hand-crafted components
					</motion.p>

					{/* Category distribution */}
					<div className="flex flex-wrap gap-x-4 gap-y-1">
						{categoryData.map((cat, i) => (
							<CategoryStat
								key={cat.name}
								name={cat.name}
								count={cat.count}
								delay={0.15 + i * 0.06}
							/>
						))}
					</div>

					{/* Tech stack */}
					<div className="flex flex-wrap gap-2 pt-1">
						{techStack.map((tech, i) => (
							<TechBadge key={tech} label={tech} delay={0.3 + i * 0.05} />
						))}
					</div>
				</div>

				{/* Right column */}
				<div className="flex flex-col items-end justify-between gap-4">
					<motion.a
						href="https://github.com/iceinvein/ui-demo"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 text-default-400 text-xs transition-colors hover:text-default-600"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2, duration: 0.5 }}
						whileHover={{ x: 2 }}
					>
						<svg
							className="h-4 w-4"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
						</svg>
						View source
					</motion.a>

					<motion.p
						className="text-default-400/60 text-xs"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.3, duration: 0.5 }}
					>
						{new Date().getFullYear()}
					</motion.p>
				</div>
			</div>
		</footer>
	);
}

// ── Layout ──────────────────────────────────────────────────────────────────

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative flex min-h-screen flex-col">
			<Navbar />
			<main className="flex-grow pt-16">{children}</main>
			<ShowcaseFooter />
		</div>
	);
}
