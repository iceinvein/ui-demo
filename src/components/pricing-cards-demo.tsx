import { Button } from "@heroui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type BillingPeriod = "monthly" | "yearly";

type Plan = {
	id: string;
	name: string;
	monthlyPrice: number;
	yearlyPrice: number;
	description: string;
	features: string[];
	cta: string;
	featured: boolean;
	variant: "flat" | "shadow" | "bordered";
	color: "default" | "primary" | "secondary";
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PLANS: Plan[] = [
	{
		id: "free",
		name: "Free",
		monthlyPrice: 0,
		yearlyPrice: 0,
		description: "Perfect for side projects and experimentation.",
		features: [
			"Up to 3 projects",
			"1 GB storage",
			"Community support",
			"Basic analytics",
			"Public repositories",
		],
		cta: "Get started",
		featured: false,
		variant: "bordered",
		color: "default",
	},
	{
		id: "pro",
		name: "Pro",
		monthlyPrice: 19,
		yearlyPrice: 15,
		description: "Everything you need to ship great products.",
		features: [
			"Unlimited projects",
			"50 GB storage",
			"Priority support",
			"Advanced analytics",
			"Private repositories",
			"Custom domains",
			"Team collaboration",
		],
		cta: "Start free trial",
		featured: true,
		variant: "shadow",
		color: "primary",
	},
	{
		id: "enterprise",
		name: "Enterprise",
		monthlyPrice: 49,
		yearlyPrice: 39,
		description: "Advanced controls for large-scale organizations.",
		features: [
			"Everything in Pro",
			"Unlimited storage",
			"Dedicated support",
			"SLA guarantee",
			"SSO / SAML",
			"Audit logs",
			"Custom integrations",
			"On-premise option",
		],
		cta: "Contact sales",
		featured: false,
		variant: "bordered",
		color: "default",
	},
];

// ---------------------------------------------------------------------------
// Billing Toggle
// ---------------------------------------------------------------------------

function BillingToggle({
	period,
	onChange,
}: {
	period: BillingPeriod;
	onChange: (p: BillingPeriod) => void;
}) {
	return (
		<div className="flex flex-col items-center gap-3">
			<div className="relative flex items-center gap-1 rounded-full border border-default-200 bg-default-100 p-1">
				{(["monthly", "yearly"] as const).map((option) => (
					<button
						key={option}
						type="button"
						onClick={() => onChange(option)}
						className="relative z-10 rounded-full px-5 py-1.5 font-medium text-sm capitalize transition-colors duration-150"
						style={{
							color:
								period === option
									? "var(--heroui-colors-primary-foreground, #fff)"
									: undefined,
						}}
					>
						{/* Active background pill — shared layoutId so it slides */}
						{period === option && (
							<motion.span
								layoutId="billing-pill"
								className="absolute inset-0 rounded-full bg-primary"
								style={{ zIndex: -1 }}
								transition={{ type: "spring", stiffness: 400, damping: 30 }}
							/>
						)}
						<span
							className={period === option ? "text-white" : "text-default-600"}
						>
							{option === "monthly" ? "Monthly" : "Yearly"}
						</span>
					</button>
				))}
			</div>

			{/* Save badge — only visible on yearly */}
			<AnimatePresence>
				{period === "yearly" && (
					<motion.span
						key="save-badge"
						initial={{ opacity: 0, scale: 0.7, y: -6 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.7, y: -6 }}
						transition={{ type: "spring", stiffness: 400, damping: 25 }}
						className="rounded-full bg-emerald-100 px-3 py-0.5 font-semibold text-emerald-700 text-xs dark:bg-emerald-900/40 dark:text-emerald-400"
					>
						Save 20%
					</motion.span>
				)}
			</AnimatePresence>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Animated Price
// ---------------------------------------------------------------------------

function AnimatedPrice({
	price,
	period,
}: {
	price: number;
	period: BillingPeriod;
}) {
	const label = price === 0 ? "Free" : `$${price}`;
	const sub =
		price === 0 ? null : period === "monthly" ? "/mo" : "/mo, billed yearly";

	return (
		<div className="flex items-end gap-1">
			<AnimatePresence mode="wait">
				<motion.span
					key={`${label}-${period}`}
					initial={{ opacity: 0, y: 14 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -14 }}
					transition={{ duration: 0.2, ease: "easeInOut" }}
					className="font-bold text-4xl text-default-900 leading-none"
				>
					{label}
				</motion.span>
			</AnimatePresence>
			{sub && (
				<span className="mb-0.5 text-default-500 text-sm leading-none">
					{sub}
				</span>
			)}
		</div>
	);
}

// ---------------------------------------------------------------------------
// Pricing Card
// ---------------------------------------------------------------------------

const cardVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.1,
			type: "spring" as const,
			stiffness: 260,
			damping: 22,
		},
	}),
};

function PricingCard({
	plan,
	period,
	index,
}: {
	plan: Plan;
	period: BillingPeriod;
	index: number;
}) {
	const price = period === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

	return (
		<motion.div
			custom={index}
			variants={cardVariants}
			initial="hidden"
			animate="visible"
			className={[
				"relative flex flex-col rounded-2xl border p-6",
				plan.featured
					? [
							"border-transparent bg-default-50 shadow-2xl shadow-primary/20",
							// Gradient border via pseudo-element simulation with an outline ring
							"ring-2 ring-primary/60",
						].join(" ")
					: "border-default-200 bg-default-50",
			].join(" ")}
		>
			{/* Gradient top accent on featured card */}
			{plan.featured && (
				<div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-violet-500 via-primary to-cyan-500" />
			)}

			{/* Popular badge */}
			{plan.featured && (
				<div className="-top-3.5 -translate-x-1/2 absolute left-1/2">
					<span className="rounded-full bg-gradient-to-r from-violet-500 to-primary px-4 py-1 font-semibold text-white text-xs shadow-md shadow-primary/30">
						Popular
					</span>
				</div>
			)}

			{/* Plan name + description */}
			<p className="mb-1 font-semibold text-default-500 text-xs uppercase tracking-widest">
				{plan.name}
			</p>
			<p className="mb-5 text-default-500 text-sm leading-relaxed">
				{plan.description}
			</p>

			{/* Animated price */}
			<div className="mb-6">
				<AnimatedPrice price={price} period={period} />
			</div>

			{/* CTA */}
			<Button
				color={plan.featured ? "primary" : "default"}
				variant={plan.featured ? "shadow" : "bordered"}
				className="mb-6 w-full font-semibold"
			>
				{plan.cta}
			</Button>

			{/* Divider */}
			<div className="mb-4 h-px bg-default-200" />

			{/* Features */}
			<ul className="flex flex-col gap-2.5">
				{plan.features.map((feature) => (
					<li key={feature} className="flex items-center gap-2.5">
						<span
							className={[
								"flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full",
								plan.featured
									? "bg-primary/15 text-primary"
									: "bg-default-200 text-default-600",
							].join(" ")}
						>
							<Check className="h-2.5 w-2.5" strokeWidth={3} />
						</span>
						<span className="text-default-600 text-sm">{feature}</span>
					</li>
				))}
			</ul>
		</motion.div>
	);
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function PricingCardsDemo() {
	const [period, setPeriod] = useState<BillingPeriod>("monthly");

	return (
		<div className="min-h-[600px] p-8">
			<div className="mx-auto max-w-5xl">
				{/* Header */}
				<div className="mb-10 text-center">
					<h2 className="mb-2 font-bold text-3xl text-default-900">
						Simple, transparent pricing
					</h2>
					<p className="text-default-500">
						Choose the plan that fits your workflow. Upgrade or cancel any time.
					</p>
				</div>

				{/* Toggle */}
				<div className="mb-10 flex justify-center">
					<BillingToggle period={period} onChange={setPeriod} />
				</div>

				{/* Cards grid */}
				<div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
					{PLANS.map((plan, i) => (
						<PricingCard key={plan.id} plan={plan} period={period} index={i} />
					))}
				</div>
			</div>
		</div>
	);
}
