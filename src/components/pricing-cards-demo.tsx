import { Button } from "@heroui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";

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
};

const PLANS: Plan[] = [
	{
		id: "free",
		name: "Starter",
		monthlyPrice: 0,
		yearlyPrice: 0,
		description: "For side projects and experimentation",
		features: [
			"Up to 3 projects",
			"1 GB storage",
			"Community support",
			"Basic analytics",
		],
		cta: "Get started",
		featured: false,
	},
	{
		id: "pro",
		name: "Pro",
		monthlyPrice: 24,
		yearlyPrice: 19,
		description: "Everything you need to ship fast",
		features: [
			"Unlimited projects",
			"100 GB storage",
			"Priority support",
			"Advanced analytics",
			"Custom domains",
			"Team collaboration",
		],
		cta: "Start free trial",
		featured: true,
	},
	{
		id: "enterprise",
		name: "Enterprise",
		monthlyPrice: 79,
		yearlyPrice: 63,
		description: "For large-scale organizations",
		features: [
			"Everything in Pro",
			"Unlimited storage",
			"Dedicated support",
			"SSO & SAML",
			"Audit logs",
			"Custom integrations",
		],
		cta: "Contact sales",
		featured: false,
	},
];

// ── Billing Toggle ──────────────────────────────────────────────────────────

function BillingToggle({
	period,
	onChange,
}: {
	period: BillingPeriod;
	onChange: (p: BillingPeriod) => void;
}) {
	return (
		<div className="flex items-center gap-3">
			<div className="relative flex items-center rounded-full border border-default-200/60 bg-default-100/60 p-1">
				{(["monthly", "yearly"] as const).map((option) => (
					<button
						key={option}
						type="button"
						onClick={() => onChange(option)}
						className="relative z-10 rounded-full px-5 py-1.5 font-medium text-sm transition-colors"
					>
						{period === option && (
							<motion.span
								layoutId="billing-active"
								className="absolute inset-0 rounded-full bg-default-900"
								style={{ zIndex: -1 }}
								transition={{
									type: "spring" as const,
									stiffness: 400,
									damping: 30,
								}}
							/>
						)}
						<span
							className={
								period === option ? "text-default-50" : "text-default-500"
							}
						>
							{option === "monthly" ? "Monthly" : "Yearly"}
						</span>
					</button>
				))}
			</div>
			<AnimatePresence>
				{period === "yearly" && (
					<motion.span
						initial={{ opacity: 0, scale: 0.8, x: -8 }}
						animate={{ opacity: 1, scale: 1, x: 0 }}
						exit={{ opacity: 0, scale: 0.8, x: -8 }}
						transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
						className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-semibold text-emerald-500 text-xs"
					>
						−20%
					</motion.span>
				)}
			</AnimatePresence>
		</div>
	);
}

// ── Animated Price ──────────────────────────────────────────────────────────

function AnimatedPrice({
	price,
	period,
}: {
	price: number;
	period: BillingPeriod;
}) {
	const label = price === 0 ? "$0" : `$${price}`;

	return (
		<div className="flex items-baseline gap-1">
			<AnimatePresence mode="wait">
				<motion.span
					key={`${label}-${period}`}
					initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
					animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
					transition={{ duration: 0.25 }}
					className="font-bold text-4xl text-default-900 tabular-nums leading-none"
				>
					{label}
				</motion.span>
			</AnimatePresence>
			<span className="text-default-400 text-sm">/mo</span>
		</div>
	);
}

// ── Pricing Card ────────────────────────────────────────────────────────────

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
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				delay: index * 0.1,
				type: "spring" as const,
				stiffness: 260,
				damping: 22,
			}}
			whileHover={{ y: -4 }}
			className={[
				"relative flex flex-col rounded-2xl border p-6",
				plan.featured
					? "border-primary/30 bg-default-50 shadow-xl shadow-primary/10 ring-1 ring-primary/20"
					: "border-default-200/60 bg-default-50",
			].join(" ")}
		>
			{/* Top accent line */}
			{plan.featured && (
				<div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-primary to-transparent" />
			)}

			{/* Header */}
			<div className="mb-5 flex items-center gap-2">
				<p className="font-semibold text-default-900">{plan.name}</p>
				{plan.featured && (
					<span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary text-xs">
						<Sparkles className="h-3 w-3" />
						Popular
					</span>
				)}
			</div>

			{/* Price */}
			<div className="mb-2">
				<AnimatedPrice price={price} period={period} />
			</div>
			<p className="mb-6 text-default-400 text-sm">{plan.description}</p>

			{/* CTA */}
			<Button
				color={plan.featured ? "primary" : "default"}
				variant={plan.featured ? "shadow" : "bordered"}
				className="mb-6 w-full font-medium"
			>
				{plan.cta}
			</Button>

			{/* Features */}
			<div className="h-px bg-default-200/60" />
			<ul className="mt-4 flex flex-col gap-2.5">
				{plan.features.map((feature, i) => (
					<motion.li
						key={feature}
						initial={{ opacity: 0, x: -8 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: index * 0.1 + i * 0.04, duration: 0.3 }}
						className="flex items-center gap-2.5"
					>
						<span
							className={[
								"flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full",
								plan.featured
									? "bg-primary/15 text-primary"
									: "bg-default-100 text-default-500",
							].join(" ")}
						>
							<Check className="h-2.5 w-2.5" strokeWidth={3} />
						</span>
						<span className="text-default-500 text-sm">{feature}</span>
					</motion.li>
				))}
			</ul>
		</motion.div>
	);
}

// ── Main Export ──────────────────────────────────────────────────────────────

export function PricingCardsDemo() {
	const [period, setPeriod] = useState<BillingPeriod>("monthly");

	return (
		<div className="flex min-h-[600px] flex-col items-center justify-center p-8">
			<div className="mx-auto w-full max-w-4xl">
				{/* Header */}
				<div className="mb-8 text-center">
					<h2 className="mb-2 font-bold text-2xl text-default-900">
						Simple, transparent pricing
					</h2>
					<p className="text-default-400 text-sm">
						Choose the plan that fits. Upgrade or cancel any time.
					</p>
				</div>

				{/* Toggle */}
				<div className="mb-10 flex justify-center">
					<BillingToggle period={period} onChange={setPeriod} />
				</div>

				{/* Cards */}
				<div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
					{PLANS.map((plan, i) => (
						<PricingCard key={plan.id} plan={plan} period={period} index={i} />
					))}
				</div>
			</div>
		</div>
	);
}
